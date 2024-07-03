"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { useFormState } from "react-dom";
import { updateProfileAction } from "@/data/actions/profile-actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"
import { StrapiErrors } from "@/components/custom/StrapiErrors";

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
};

export function ProfileForm({
  data,
  className,
}) {
  const updateProfileWithId = updateProfileAction.bind(null, data.id);

  const [formState, formAction] = useFormState(
    updateProfileWithId,
    INITIAL_STATE
  );

  return (
    <form
      className="w-full flex justify-center"
      action={formAction}
    >
      <div className="w-full max-w-xl border-neutral-800 bg-black p-6 pb-6 text-white sm:border-x">
        <div className="grid gap-4">
          <Label htmlFor="username">Display name</Label>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data.username || ""}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data.email || ""}
            disabled
          />
          <p className="text-xs text-muted-foreground">Email cant be changed.</p>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data.firstName || ""}
          />
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data.lastName || ""}
          />
          <Label htmlFor="bio">Bio (optional)</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Write your bio here..."
            className="resize-none border rounded-md w-full h-[224px] p-2"
            defaultValue={data.bio || ""}
            required
          />
          <div className="flex justify-end">
            <SubmitButton text="Update Profile" loadingText="Saving Profile" />
          </div>
        </div>
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
    </form>
  );
}