export interface Fields {
  id: number;
  status: string;
  userName: string;
  userRa: number;
  courseName: string;
  courseTeacher: string;
}

export interface IExportStratagy {
  export(data: Fields[]): Promise<string>;
}