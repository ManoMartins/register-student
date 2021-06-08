import { Fields, IExportStratagy } from "./IExportStratagy";

class ExportFile {
  private exporter;

  constructor(exporter: IExportStratagy) {
    this.exporter = exporter;
  }

  public exportFile(data: Fields[]) {
    return this.exporter.export(data)
  }
}

export default ExportFile;