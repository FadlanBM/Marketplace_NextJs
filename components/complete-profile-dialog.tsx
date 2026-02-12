"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";

interface CompleteProfileDialogProps {
  defaultOpen?: boolean;
}

export function CompleteProfileDialog({ defaultOpen = false }: CompleteProfileDialogProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form>
          <DialogHeader>
            <DialogTitle>Lengkapi Profil</DialogTitle>
            <DialogDescription>
              Silakan lengkapi informasi profil Anda untuk melanjutkan ke dashboard.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                placeholder="Masukkan nama lengkap"
              />
            </Field>
            <Field>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Masukkan username"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" className="w-full">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
