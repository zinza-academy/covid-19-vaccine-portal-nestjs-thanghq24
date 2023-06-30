import { Command, Console } from 'nestjs-console';
import * as ExcelJS from 'exceljs';
import { Province } from 'src/entities/province.entity';
import DataSource from 'src/dataSource/typeorm.config';
import { District } from 'src/entities/district.entity';
import { Ward } from 'src/entities/ward.entity';

interface IProvince {
  id: number;
  name: string;
}

interface IDistrict {
  id: number;
  name: string;
  provinceId: number;
}

interface IWard {
  id: number;
  name: string;
  districtId: number;
}

@Console()
export class DivisionReaderService {
  @Command({
    command: 'read-divisions',
    description: 'Read divisions data from xlsx',
  })
  async readProvinceData() {
    const workbook = new ExcelJS.Workbook();
    const provinces: IProvince[] = [];
    const districts: IDistrict[] = [];
    let wards: IWard[] = [];

    await workbook.xlsx.readFile('docs/divisions-data.xlsx').then(() => {
      const worksheet = workbook.getWorksheet('Sheet1');
      worksheet.spliceRows(1, 1);
      worksheet.eachRow((row) => {
        if (
          provinces.length === 0 ||
          Number(row.getCell(2).value) !== provinces[provinces.length - 1].id
        )
          provinces.push({
            id: Number(row.getCell(2).value),
            name: row.getCell(1).value as string,
          });
        if (
          districts.length === 0 ||
          Number(row.getCell(4).value) !== districts[districts.length - 1].id
        )
          districts.push({
            id: Number(row.getCell(4).value),
            name: row.getCell(3).value as string,
            provinceId: Number(row.getCell(2).value),
          });
        if (
          wards.length === 0 ||
          Number(row.getCell(6).value) !== wards[wards.length - 1].id
        )
          wards.push({
            id: Number(row.getCell(6).value),
            name: row.getCell(5).value as string,
            districtId: Number(row.getCell(4).value),
          });
      });
    });

    wards = wards.filter((w) => w.id !== 0);

    await DataSource.initialize();

    await DataSource.createQueryBuilder()
      .insert()
      .into(Province)
      .values(provinces)
      .execute();

    await DataSource.createQueryBuilder()
      .insert()
      .into(District)
      .values(districts)
      .execute();

    await DataSource.createQueryBuilder()
      .insert()
      .into(Ward)
      .values(wards)
      .execute();
    return;
  }
}
