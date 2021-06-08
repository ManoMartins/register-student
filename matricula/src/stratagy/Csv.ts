import fs from 'fs'
import path from 'path'
import json2csv  from 'json2csv'

import { Fields, IExportStratagy } from "./IExportStratagy";

class Csv implements IExportStratagy {
  filePath = path.join(__dirname, "..", "..", "export.csv");
  async export(data: Fields[]): Promise<string> {
    const csv = json2csv.parse(data, {
      fields: [
        { value: 'id', label: 'id' },
        { value: 'userRa', label: 'RA' },
        { value: 'status', label: 'Status do aluno' },
        { value: 'userName', label: 'Nome do aluno' },
        { value: 'courseName', label: 'Nome do curso' },
        { value: 'courseTeacher', label: 'Nome do professor' },
      ],
    })

    const file = await new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, csv, (err) => {
        if (err) {
          return console.log(err);
        }

        resolve(this.filePath)
      })
    })

    return file as string
  }
}

export default Csv;