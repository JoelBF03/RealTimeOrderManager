import { Resolver, Query, Context } from '@nestjs/graphql';
import { ReportService } from '../report.service';

@Resolver()
export class ReportResolver {
  constructor(private readonly reportService: ReportService) {}

  @Query(() => String)
  async generateClientReport(@Context() context: any) {
    const authorizationHeader = context.req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing in the Authorization header');
    }
    return await this.reportService.generateClientOrdersReport(token);
  }
}
