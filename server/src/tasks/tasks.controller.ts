import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import TaskModel from 'src/models/task.model';
import CreateTaskDto from './dto/create-task-dto';
import TaskParams from './dto/task-params';
import UpdateTaskDto from './dto/update-task-dto';
import { AuthGuard } from 'src/auth/auth-guard';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor (private tasksService: TasksService) {}

  @ApiOperation({summary: 'Create a new task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() taskDto: CreateTaskDto):Promise<TaskModel> {
    return await this.tasksService.createTask(taskDto)
  }
  
  @ApiOperation({summary: 'Getting a user`s tasks'})
  @ApiResponse({status: 200, type: [TaskModel]})
  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getAllTask(@Param('userId') userId: string):Promise<TaskModel[]> {
    return await this.tasksService.getAllTasks(userId)
  }
  
  @ApiOperation({summary: 'Getting a specific user`s task'})
  @ApiResponse({status: 200, type: TaskModel})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Get('/:userId/:taskId')
  async getTask(@Param() params: TaskParams):Promise<TaskModel> {
    return await this.tasksService.getTask(params)
  }

  @ApiOperation({summary: 'Update a specific user`s task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Put()
  async updateTask(@Body() taskDto: UpdateTaskDto):Promise<TaskModel> {
    return await this.tasksService.updateTask(taskDto)
  }

  @ApiOperation({summary: 'Delete all user`s tasks'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Delete('/:userId')
  async removeTasks(@Param('userId') userId: string) {
    return await this.tasksService.removeTasks(userId)
  }

  @ApiOperation({summary: 'Delete all user`s compelted tasks'})
  @ApiResponse({status: 201})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Delete('/completed/:userId')
  async removeCompletedTasks(@Param('userId') userId: string) {
    return await this.tasksService.removeCompletedTasks(userId)
  }

  @ApiOperation({summary: 'Delete a specific user`s task'})
  @ApiResponse({status: 201, type: TaskModel})
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @Delete('/:userId/:taskId')
  async removeTask(@Param() params: TaskParams):Promise<TaskModel> {
    return await this.tasksService.removeTask(params)
  }
}