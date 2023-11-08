"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  expense: z.string().min(2, {
    message: "Expense must be at least 2 characters.",
  }),
  totalValue: z.number().nonnegative().min(0.01, {
    message: "Total value must be at least 0.01.",
  }),
  paid: z.boolean(),
  monthlyValue: z.number().nonnegative().nullable(),
  date: z.date(),
  installments: z.number().nonnegative().nullable(),
  description: z.string().nullable(),
});

export default function NewExpense() {
  const [isInstallmentsGreaterThanZero, setIsInstallmentsGreaterThanZero] =
    useState(false);
  const [isInstallments, setIsInstallments] = useState(false);

  // 1. Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paid: false,
      expense: "",
      monthlyValue: 0,
      date: new Date(),
      installments: 0,
      totalValue: 0,
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await axios.post("/api/create-expense", { ...values });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  }

  function onChangeInstallments(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);

    if (value > 0) {
      setIsInstallmentsGreaterThanZero(true);
    } else {
      setIsInstallmentsGreaterThanZero(false);
    }
  }

  function onChangeInstallmentsSwitch() {
    console.log("switch", isInstallments);
    setIsInstallments(!isInstallments);
  }

  return (
    <div className="flex w-full items-center justify-end">
      <Dialog>
        <DialogTrigger>
          <PlusCircle />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Add new expense</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="expense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense</FormLabel>
                      <FormControl>
                        <Input placeholder="Example: House rent" {...field} />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total value</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-2">
                  <FormLabel>Is it paid in installments?</FormLabel>
                  <Switch onCheckedChange={onChangeInstallmentsSwitch} />
                </div>

                {isInstallments && (
                  <FormField
                    control={form.control}
                    name="installments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installments</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            onChangeCapture={onChangeInstallments}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {isInstallmentsGreaterThanZero && (
                  <FormField
                    control={form.control}
                    name="monthlyValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installment value</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        {/* <FormDescription>0 if non installments</FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="paid"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Paid</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Buyed at</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// paid: false,
// expense: "Paper Towel Touchless",
// monthlyValue: 55,
// date: "3/28/2023",
// installments: 1,
// totalValue: 65,
// description:
//   "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
// userId: "0290542c-4954-4e87-aa8b-b300d9089a2c",
