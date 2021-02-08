import { Task } from './task';
import { Links } from './links';
import { Page } from './page';

export class TaskResource {
  constructor(public tasks: Task[], public _links?: Links, public page: Page = new Page()) {
  }
}
