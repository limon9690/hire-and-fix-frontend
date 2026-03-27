"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateAdminCategoryAction } from "@/lib/dashboard/admin/categories/admin-category-update-actions";

const editCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().optional(),
});

type EditCategoryFormValues = z.infer<typeof editCategorySchema>;

type AdminCategoryEditDialogProps = {
  categoryId: string;
  initialName: string;
  initialDescription: string | null;
};

export function AdminCategoryEditDialog({
  categoryId,
  initialName,
  initialDescription,
}: AdminCategoryEditDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: initialName,
      description: initialDescription ?? "",
    },
  });

  const onSubmit = async (values: EditCategoryFormValues) => {
    const result = await updateAdminCategoryAction(categoryId, values);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="h-8 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Edit Service Category
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Update category name and description.
            </AlertDialog.Description>

            <form
              className="mt-4 space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor={`category-name-${categoryId}`}>Category name</Label>
                <input
                  id={`category-name-${categoryId}`}
                  className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                  {...form.register("name")}
                />
                {form.formState.errors.name ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`category-description-${categoryId}`}>
                  Description
                </Label>
                <textarea
                  id={`category-description-${categoryId}`}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  placeholder="Installation and maintenance"
                  {...form.register("description")}
                />
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
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
