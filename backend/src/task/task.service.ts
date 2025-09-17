import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, author: User) {
    const newTask = this.taskRepository.create({
      slug: createSlugFromText(dto.title),
      title: dto.title,
      content: dto.content,
      priority: dto.priority,
      author,
    });

    const created = await this.taskRepository
      .save(newTask)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar task', err.stack);
        }
        throw new BadRequestException('Erro ao criar tarefa');
      });

    return created;
  }

  async findAllTask(author: User) {
    const tasks = await this.taskRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return tasks;
  }

  async findAllTaskByStatus(done: boolean, author: User) {
    const tasks = await this.taskRepository.find({
      where: {
        done,
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return tasks;
  }

  async toogleDone(id: string, author: User) {
    const task = await this.taskRepository.findOne({
      where: { id, author: { id: author.id } },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    task.done = !task.done;
    return this.taskRepository.save(task);
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
