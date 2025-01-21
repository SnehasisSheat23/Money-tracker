import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { moneySign } from "../../utils/formatters";
import {
  CreditCard,
  Music2Icon,
  MonitorPlay,
  Cloud,
  Newspaper,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "./lib/utils";

interface Transaction {
  id: string;
  service: string;
  amount: number;
  date: string;
  status: "active" | "pending" | "failed";
  type: "entertainment" | "cloud" | "shopping" | "news" | "music";
}

const transactions: Transaction[] = [
  {
    id: "1",
    service: "Netflix",
    amount: 700,
    date: "2024-03-15",
    status: "active",
    type: "entertainment",
  },
  {
    id: "2",
    service: "Spotify",
    amount: 60,
    date: "2024-03-14",
    status: "active",
    type: "music",
  },
  {
    id: "3",
    service: "AWS",
    amount: 1500,
    date: "2024-03-13",
    status: "pending",
    type: "cloud",
  },
  {
    id: "4",
    service: "NY Times",
    amount: 170,
    date: "2024-03-12",
    status: "active",
    type: "news",
  },
  {
    id: "5",
    service: "Amazon Prime",
    amount: 159,
    date: "2024-03-11",
    status: "active",
    type: "shopping",
  },
];

const getIcon = (type: Transaction["type"]) => {
  const iconProps = { className: "w-5 h-5" };
  switch (type) {
    case "entertainment":
      return <MonitorPlay {...iconProps} />;
    case "music":
      return <Music2Icon {...iconProps} />;
    case "cloud":
      return <Cloud {...iconProps} />;
    case "news":
      return <Newspaper {...iconProps} />;
    case "shopping":
      return <ShoppingBag {...iconProps} />;
  }
};

const getStatusColor = (status: Transaction["status"]) => {
  switch (status) {
    case "active":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "pending":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    case "failed":
      return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  }
};

export function SubscriptionManager() {
  const totalMonthly = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const activeSubscriptions = transactions.filter(t => t.status === "active").length;

  return (
    <Card className="w-full border-none bg-white shadow-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Subscriptions</h2>
          <div className="flex items-center space-x-2 text-gray-500">
            <CreditCard className="w-4 h-4" />
            <span className="text-sm">Monthly Overview</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Total Cost</span>
              <TrendingUp className="w-4 h-4 text-primary/60" />
            </div>
            <div className="text-2xl font-bold tracking-tight">
              {moneySign(totalMonthly.toFixed(2))}
              <span className="text-sm font-normal text-muted-foreground ml-1">/ month</span>
            </div>
          </div>
          
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Active Services</span>
              <ArrowUpRight className="w-4 h-4 text-primary/60" />
            </div>
            <div className="text-2xl font-bold tracking-tight">
              {activeSubscriptions}
              <span className="text-sm font-normal text-muted-foreground ml-1">subscriptions</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[350px] pr-3">
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="group flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                <div className="flex items-center space-x-4">
                <div className="icon-bg p-2 rounded-lg transition-colors">
          {getIcon(transaction.type)}
        </div>
                  <div>
                    <div className="font-medium tracking-tight">{transaction.service}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "capitalize font-medium text-xs px-2.5 py-0.5 tracking-wide",
                      getStatusColor(transaction.status)
                    )}
                  >
                    {transaction.status}
                  </Badge>
                  <div className="font-medium tabular-nums">
                    {moneySign(transaction.amount.toFixed(2))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}