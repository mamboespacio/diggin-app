"use client";
import React from "react";
import { useFormState } from "react-dom";

import { cn } from "@/lib/utils";

import { uploadProfileImageAction } from "@/data/actions/profile-actions";

import { SubmitButton } from "@/components/custom/SubmitButton";
import ImagePicker from "@/components/custom/ImagePicker";
import { ZodErrors } from "@/components/custom/ZodErrors";
import { StrapiErrors } from "@/components/custom/strapiErrors";

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ProfileImageForm({
  data,
  className,
}) {

  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id
  );

  const [formState, formAction] = useFormState(
    uploadProfileImageWithIdAction,
    initialState
  );

  return (
    <form className="w-full flex justify-center" action={formAction}>
      <div class="w-full max-w-xl border-neutral-800 bg-black p-6 pb-6 text-white sm:border-x">
        <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Photo</label>
        <div class="mt-2 flex items-center gap-x-3">
            <ImagePicker
              id="image"
              name="image"
              label="Profile Image"
              defaultValue={data?.url || ""}
            />
            <ZodErrors error={formState.zodErrors?.image} />
            <StrapiErrors error={formState.strapiErrors} />
            <SubmitButton text="Update Image" loadingText="Saving Image" />
        </div>
      </div>
    </form>
  );
}