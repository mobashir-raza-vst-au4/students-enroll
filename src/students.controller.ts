import { Controller, Post, Get, Param, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

interface Student {
  id: number;
  name: string;
  roll: number;
}

@Controller('students')
export class StudentsController {
  private students: Student[] = [];
  
  @Post('create')
  create(@Req() req:Request, @Res() res:Response) {
    console.log("Hey", req.body)

    const student: Student = {
      id: this.generateUniqueId(),
      name: req.body.name,
      roll: req.body.roll,
    };

    this.students.push(student);

    res.status(HttpStatus.CREATED).send(student);
  }

  @Get(':id')
  getStudentById(@Param('id') id: string, @Res() res: Response) {
    const studentId = parseInt(id);
    const student = this.students.find((s) => s.id === studentId);

    if (!student) {
      return res.status(HttpStatus.NOT_FOUND).send('Student not found');
    }

    res.status(HttpStatus.OK).send(student);
  }

  private generateUniqueId(): number {
    const existingIds = this.students.map((student) => student.id);
    let newId = 1;

    while (existingIds.includes(newId)) {
      newId++;
    }

    return newId;
  }

}