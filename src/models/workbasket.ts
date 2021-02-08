import { Links } from './links';
import { WorkbasketType } from './workbasket-type';

export class Workbasket {
  constructor(
    public workbasketId?: string,
    public key?: string,
    public name?: string,
    public domain?: string,
    public type?: WorkbasketType | string,
    public description?: string,
    public owner?: string,
    public custom1?: string,
    public custom2?: string,
    public custom3?: string,
    public custom4?: string,
    public orgLevel1?: string,
    public orgLevel2?: string,
    public orgLevel3?: string,
    public orgLevel4?: string,
    public markedForDeletion?: boolean,
    public created?: string,
    public modified?: string,
    public _links?: Links,
    // this is not part of the API, but needed for frontend
    public selected?: boolean,
  ) {
    if (typeof this.type == 'string') this.type = this.type as WorkbasketType;
  }
}

export const customFieldCount: number = 4;
