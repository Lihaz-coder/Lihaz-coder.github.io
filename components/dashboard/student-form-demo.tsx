"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DemoBadge } from "@/components/dashboard/demo-badge";
import { FormSection } from "@/components/dashboard/form-section";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter valid phone number"),
  gender: z.enum(["male", "female", "other"]),
  className: z.string().min(1, "Select a class"),
  receiveUpdates: z.boolean(),
  terms: z.boolean().refine((value) => value, "You must accept terms"),
});

type StudentFormValues = z.infer<typeof formSchema>;

export function StudentFormDemo() {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "male",
      className: "",
      receiveUpdates: true,
      terms: false,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Form design system</h2>
        <DemoBadge />
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
          <Tabs defaultValue="student">
            <TabsList>
              <TabsTrigger value="student">Student Information</TabsTrigger>
              <TabsTrigger value="contact">Contact Information</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="space-y-4">
              <FormSection title="Student Information" description="Reusable form section with validated fields.">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ahmed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Khan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal")}> <CalendarIcon className="mr-2 h-4 w-4" /> Select date</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender *</FormLabel>
                        <FormControl>
                          <RadioGroup className="flex gap-4" value={field.value} onValueChange={field.onChange}>
                            <div className="flex items-center gap-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
                            <div className="flex items-center gap-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Female</Label></div>
                            <div className="flex items-center gap-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Other</Label></div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <Input type="file" />
                    <FormDescription>File upload UI demo only.</FormDescription>
                  </FormItem>
                </div>
              </FormSection>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <FormSection title="Contact Information">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+92 300 1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="student@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 space-y-3">
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Street, city, postal code..." />
                    </FormControl>
                  </FormItem>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="receiveUpdates"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-md border border-border p-3">
                          <div className="space-y-1">
                            <FormLabel>Receive updates</FormLabel>
                            <FormDescription>Email notifications for school alerts.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="rounded-md border border-border p-3">
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>I confirm the details are correct *</FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </FormSection>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Info className="size-3.5" /> UI-only submission for Milestone 2</p>
                </TooltipTrigger>
                <TooltipContent>Backend integration will be added in later milestones.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button type="submit">Save (placeholder)</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
