import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { DivisionReaderService } from './division-reader.service';

@Module({
  imports: [ConsoleModule],
  providers: [DivisionReaderService],
})
export class DivisionReaderModule {}
