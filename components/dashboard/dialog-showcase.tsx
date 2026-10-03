"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { DemoBadge } from "@/components/dashboard/demo-badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const detailsLines = Array.from({ length: 10 }).map((_, index) => `Demo line ${index + 1}: this details panel is scrollable and reusable.`);

export function DialogShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Dialogs and drawers</CardTitle>
          <DemoBadge />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTitle>Milestone 2 scope</AlertTitle>
          <AlertDescription>These actions demonstrate reusable UI patterns only. No real records are changed.</AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Student (UI)</DialogTitle>
                <DialogDescription>Reusable add-item dialog pattern for future modules.</DialogDescription>
              </DialogHeader>
              <Progress value={65} />
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Placeholder saved")}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Edit Student</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Student (Mobile-friendly Sheet)</SheetTitle>
                <SheetDescription>This drawer pattern is used for compact screens.</SheetDescription>
              </SheetHeader>
              <Separator className="my-4" />
              <Button onClick={() => toast.info("Placeholder update action")}>Update</Button>
            </SheetContent>
          </Sheet>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Student</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete student record?</AlertDialogTitle>
                <AlertDialogDescription>This is a reusable destructive confirmation pattern.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.warning("Placeholder deletion")}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">View details</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>View details</DialogTitle>
                <DialogDescription>Scrollable details pattern.</DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-36 rounded-md border border-border p-3 text-sm text-muted-foreground">
                <div className="space-y-1">
                  {detailsLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="filters">
            <AccordionTrigger>Filter drawer pattern notes</AccordionTrigger>
            <AccordionContent>Combine Sheet + form controls for reusable filter UI across tables.</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="gap-2">More UI guidance <ChevronDown className="size-4" /></Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="text-sm text-muted-foreground">
            Use the same dialog components for Add, Edit, Delete, and Details in all modules.
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
