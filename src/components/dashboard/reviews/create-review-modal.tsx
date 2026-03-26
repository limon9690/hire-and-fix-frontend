"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createReviewAction } from "@/lib/reviews/create-review-action";
import {
  createReviewSchema,
  type CreateReviewPayload,
} from "@/lib/reviews/create-review-schema";

type CreateReviewModalProps = {
  bookingId: string;
  employeeName: string;
};

export function CreateReviewModal({
  bookingId,
  employeeName,
}: CreateReviewModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<CreateReviewPayload>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      bookingId,
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (values: CreateReviewPayload) => {
    const result = await createReviewAction(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setOpen(false);
    form.reset({
      bookingId,
      rating: 5,
      comment: "",
    });
    router.refresh();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-10 cursor-pointer rounded-lg px-3 text-sm font-medium"
        onClick={() => setOpen(true)}
      >
        Write Review
      </Button>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Review {employeeName}
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Share your service experience for this completed booking.
            </AlertDialog.Description>

            <form
              className="mt-4 space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <input type="hidden" {...form.register("bookingId")} />

              <div className="space-y-2">
                <Label htmlFor="review-rating">Rating</Label>
                <select
                  id="review-rating"
                  className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  {...form.register("rating", { valueAsNumber: true })}
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
                {form.formState.errors.rating ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.rating.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-comment">Comment (Optional)</Label>
                <textarea
                  id="review-comment"
                  rows={4}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  placeholder="Tell others about your experience..."
                  {...form.register("comment")}
                />
                {form.formState.errors.comment ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.comment.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
