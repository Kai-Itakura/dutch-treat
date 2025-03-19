import { Id } from 'src/modules/shared/value-objects/id';
import { Balance } from '../model/balance.model';
import { Amount } from '../value-objects/amount';

export class Expense {
  private constructor(
    private readonly _id: Id,
    private readonly _title: string,
    private readonly _amount: Amount,
    private readonly _payerId: string,
    private readonly _payeeIds: string[],
  ) {}

  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title;
  }

  get amount(): number {
    return this._amount.value;
  }

  get payerId(): string {
    return this._payerId;
  }

  get payeeIds(): string[] {
    return [...this._payeeIds];
  }

  static create(
    title: string,
    amount: number,
    payerId: string,
    payeeIds: string[],
  ): Expense {
    return new Expense(
      Id.create(),
      title,
      Amount.create(amount),
      payerId,
      payeeIds,
    );
  }

  /**
   * 1人当たりの返済額を算出
   */
  private getPerPerson(): number {
    return Math.floor(this._amount.value / this._payeeIds.length);
  }

  /**
   * 割り切れなかった余りを算出
   */
  private getRemainder(): number {
    return this._amount.value % this._payeeIds.length;
  }

  /**
   * メンバーの収支を計算
   */
  calcBalances(balances: Balance[]): void {
    // 支払いを立て替えてもらった人
    this._payeeIds.forEach((payeeId, index) => {
      const shouldPay =
        this.getPerPerson() + (this.getRemainder() > index ? 1 : 0);

      const payeeBalance = balances.find(
        (balance) => balance.memberId === payeeId,
      );
      payeeBalance?.add(shouldPay);
    });

    // 支払いを立て替えた人
    const payerBalance = balances.find(
      (balance) => balance.memberId === this._payerId,
    );
    payerBalance?.add(-this._amount.value);
  }
}
