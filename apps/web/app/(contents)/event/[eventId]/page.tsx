import BackButton from '@/app/components/back-button';
import { formatNumber } from '@/app/lib/fomat-number';
import { getCurrencySymbol } from '@/app/lib/get-currency-symbol';
import { client } from '@/openapi.config';
import { CurrencyType } from '@repo/types';
import ItemCard from '@repo/ui/components/custom/item-card';

type EventDetailProps = {
  params: {
    eventId: string;
  };
};

const EventDetail = async ({ params }: EventDetailProps) => {
  const { eventId } = await params;
  const { error, data } = await client.GET('/event-group/{groupId}', {
    params: { path: { groupId: eventId } },
  });
  if (error) {
    return <div>ERROR: {error.message}</div>;
  }

  const currencySymbol = getCurrencySymbol(data.currency as CurrencyType);
  return (
    <>
      <div className="mt-6 space-y-2">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p>
          {data.member.map(({ id, name }, index) => {
            const withSeparator = index === 0 ? name : ` | ${name}`;
            return <span key={id}>{withSeparator}</span>;
          })}
        </p>
        <p>
          合計金額: {currencySymbol}
          {data.totalExpense ? formatNumber(data.totalExpense) : 0}
        </p>
      </div>
      <div className="space-y-4 mt-6">
        {data.expenses.map((expense) => (
          <ItemCard key={expense.id}>
            <h2>{expense.title}</h2>
            <p>
              {currencySymbol}
              {formatNumber(expense.amount)}
            </p>
          </ItemCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        <BackButton>戻る</BackButton>
      </div>
    </>
  );
};

export default EventDetail;
