import * as PDFDocument from 'pdfkit';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ReportService {
    constructor(private readonly httpService: HttpService) {}

    async generateClientOrdersReport(token: string): Promise<string> {
        const ordersUrl = 'http://localhost:3000/api/orders';
        const response = await lastValueFrom(
            this.httpService.get(ordersUrl, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        );
        const orders = response.data;

        return this.generatePDFReportWithDetails(orders, 'Informe de Ventas', 'client-orders');
    }

    private generatePDFReportWithDetails(data: any[], title: string, filePrefix: string): Promise<string> {
        const reportsDir = path.join(__dirname, '../../reports');
        if (!existsSync(reportsDir)) {
            mkdirSync(reportsDir);
        }
    
        const filePath = path.join(reportsDir, `${filePrefix}-${Date.now()}.pdf`);
        const doc = new PDFDocument({ margin: 30 });
        const stream = createWriteStream(filePath);
        doc.pipe(stream);
    
        doc.font('Helvetica-Bold').fontSize(20).fillColor('#2D3E50').text(title, { align: 'center' });
        doc.font('Helvetica').fontSize(12).fillColor('#666666').text(`Generado el: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(2);
    
        let grandTotal = 0;
    
        const ordersByClient = data.reduce((acc, order) => {
            const clientName = order.client_name || `Cliente ID: ${order.client_id}`;
            if (!acc[clientName]) {
                acc[clientName] = [];
            }
            acc[clientName].push(order);
            return acc;
        }, {});
    
        for (const [clientName, orders] of Object.entries(ordersByClient)) {
            let clientTotal = 0;
    
            doc.fontSize(14).fillColor('#2D3E50').text(`Cliente: ${clientName}`, { underline: true });
            doc.moveDown(0.5);
    
            (orders as any[]).forEach((order) => {
                const totalPrice = Number(order.total_price) || 0;
                clientTotal += totalPrice;
    
                doc.fontSize(12).fillColor('#333333').text(`Orden ID: ${order.id}`);
                doc.text(`Total: $${totalPrice.toFixed(2)}`);
                doc.text(`Fecha: ${new Date(order.created_at).toLocaleDateString()}`);
                doc.text(`Método de Pago: ${order.payment_method}`);
                doc.moveDown(0.5);
    
                doc.fontSize(12).fillColor('#2D3E50').text('Detalles:', { underline: true });
                order.details.forEach((detail) => {
                    const subtotalPrice = Number(detail.subtotal_price) || 0;
                    doc.fontSize(11).fillColor('#333333')
                        .text(`   - Servicio: ${detail.service_name} | Prenda: ${detail.clothes || 'N/A'} | Cantidad: ${detail.quantity} | Subtotal: $${subtotalPrice.toFixed(2)}`);
                });
    
                doc.moveDown(1);
            });
    
            grandTotal += clientTotal;
            doc.fontSize(12).fillColor('#2D3E50').text(`Subtotal ${clientName}: $${clientTotal.toFixed(2)}`);
            doc.moveDown(2);
        }
    
        doc.fontSize(14).fillColor('#2D3E50').text(`Total General: $${grandTotal.toFixed(2)}`, { align: 'right' });
        doc.end();
    
        return new Promise((resolve, reject) => {
            stream.on('finish', () => resolve(`http://localhost:3000/reports/${path.basename(filePath)}`));
            stream.on('error', (error) => reject(`Error al generar el PDF: ${error.message}`));
        });
    }
}