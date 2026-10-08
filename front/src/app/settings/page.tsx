"use client";

import { redirect } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import Loader from "@/src/components/auth/loader";
import { Avatar, Button, Input, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png"];
export default function Settings() {
  const { user, loading, updateAvatar, logout, deleteAccount, updateNames } =
    useAuth();
  const [error, setError] = useState<{
    avatar?: string;
    profile?: string;
    account?: string;
  }>({});
  type AvatarFormData = z.infer<typeof avatarSchema>;
  type EditFormData = z.infer<typeof editSchema>;
  const avatarSchema = z.object({
    avatar: z
      .custom<FileList>(
        (value) =>
          typeof FileList !== "undefined" &&
          value instanceof FileList &&
          value.length > 0,
        "Please select an image",
      )
      .refine(
        (files) => !files?.[0] || files[0].size <= MAX_AVATAR_SIZE,
        "Image must be 5mb or smaller",
      )
      .refine(
        (files) => !files?.[0] || ACCEPTED_AVATAR_TYPES.includes(files[0].type),
        "Only JPEG and PNG images are supported",
      ),
  });
  const avatarForm = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema),
  });
  const editSchema = z.object({
    firstName: z
      .string()
      .min(4, "Must be at least 4 characters long")
      .max(20, "Must be 20 characters long or less"),
    lastName: z
      .string()
      .min(4, "Must be at least 4 characters long")
      .max(20, "Must be 20 characters long or less"),
  });
  const editForm = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
  });

  if (loading) return <Loader message="Finding your place..." />;
  if (!loading && !user) {
    redirect("/login");
  }

  const submitAvatar = async (data: AvatarFormData) => {
    try {
      await updateAvatar(data.avatar[0]);
    } catch (err) {
      setError((current) => ({
        ...current,
        avatar: err instanceof Error ? err.message : "Avatar upload failed",
      }));
    } finally {
      avatarForm.reset();
    }
  };

  const handleEdit = async (data: EditFormData) => {
    try {
      await updateNames(data.firstName, data.lastName);
      editForm.reset();
    } catch (err) {
      setError((current) => ({
        ...current,
        profile: err instanceof Error ? err.message : "Profile update failed",
      }));
    }
  };

  const handleDeletion = async () => {
    try {
      await deleteAccount();
    } catch (err) {
      setError((current) => ({
        ...current,
        account: err instanceof Error ? err.message : "Account deletion failed",
      }));
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 px-4 text-center text-foreground md:px-8 lg:px-16">
      <h1 className="w-full border-b border-border py-4 text-start font-fraunces text-4xl md:py-6 md:text-5xl lg:py-8 lg:text-6xl">
        Settings
      </h1>

      <section className="flex w-full flex-col items-start gap-4 border-b border-border pb-4 md:flex-row md:items-center md:gap-8 md:py-6 lg:gap-12 lg:py-8">
        <h2 className="text-start font-fraunces text-lg font-medium md:w-44 md:shrink-0 md:self-start md:text-xl lg:text-2xl">
          Profile photo
        </h2>
        <Avatar className="size-32 self-center rounded-full border-2 border-border md:size-36 lg:size-40">
          <Avatar.Image src={user?.avatar ?? undefined} alt={user!.username} />
          <Avatar.Fallback className="bg-background text-2xl text-accent hover:bg-card md:text-3xl">
            {user!.firstName[0] + user!.lastName[0]}
          </Avatar.Fallback>
        </Avatar>
        <div className="flex w-full flex-col gap-1 md:w-48 lg:w-56">
          <form
            onChange={() => {
              setError({});
              const handler = avatarForm.handleSubmit(submitAvatar);
              handler();
            }}
            className="w-full flex flex-col gap-1"
          >
            <Input
              {...avatarForm.register("avatar")}
              id="avatar"
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only w-full rounded-xs bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-background transition-all "
              disabled={avatarForm.formState.isSubmitting}
            />
            <Label
              htmlFor="avatar"
              aria-disabled={avatarForm.formState.isSubmitting}
              className={`rounded-xs border-2 border-accent bg-transparent py-2 text-sm text-accent transition-all md:text-base ${
                avatarForm.formState.isSubmitting
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-accent hover:text-background"
              }`}
            >
              {avatarForm.formState.isSubmitting
                ? "Changing avatar..."
                : "Change photo"}
            </Label>
            <span className="text-xs text-muted md:text-sm">
              JPG or PNG, up to 5mb
            </span>
            {avatarForm.formState.errors.avatar?.message && (
              <span className="text-sm text-accent md:text-base">
                {avatarForm.formState.errors.avatar?.message}
              </span>
            )}
            {error?.avatar && (
              <span className="text-sm text-accent md:text-base">
                {error.avatar}
              </span>
            )}
          </form>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-4 border-b border-border pb-4 md:flex-row md:gap-8 md:py-6 lg:gap-12 lg:py-8">
        <h2 className="font-fraunces text-lg font-medium md:w-44 md:shrink-0 md:text-start md:text-xl lg:text-2xl">
          Profile information
        </h2>
        <form
          className="flex w-full max-w-200 flex-col items-center justify-center gap-4"
          onSubmit={editForm.handleSubmit(handleEdit)}
        >
          <div className="flex flex-col w-full items-start gap-2">
            <Label className="text-sm md:text-base">First name</Label>
            <Input
              {...editForm.register("firstName")}
              className="w-full rounded-xs border-2 border-border bg-background text-base text-foreground shadow-none md:text-lg"
              defaultValue={user!.firstName}
            />
            {editForm.formState.errors.firstName?.message && (
              <span className="text-sm text-accent md:text-base">
                {editForm.formState.errors.firstName?.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full items-start gap-2">
            <Label className="text-sm md:text-base">Last name</Label>
            <Input
              {...editForm.register("lastName")}
              className="w-full rounded-xs border-2 border-border bg-background text-base text-foreground shadow-none md:text-lg"
              defaultValue={user!.lastName}
            />
            {editForm.formState.errors.lastName?.message && (
              <span className="text-sm text-accent md:text-base">
                {editForm.formState.errors.lastName?.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            isDisabled={editForm.formState.isSubmitting}
            className="w-full rounded-xs border-2 border-accent bg-transparent text-sm text-accent transition-all hover:bg-accent hover:text-background md:text-base lg:text-lg"
          >
            {editForm.formState.isSubmitting
              ? "Saving changes..."
              : "Save changes"}
          </Button>
          {error?.profile && (
            <span className="text-sm text-accent md:text-base">
              {error.profile}
            </span>
          )}
        </form>
      </section>

      <section className="flex w-full flex-col items-start gap-4 pb-4 md:flex-row md:gap-8 md:py-6 lg:gap-12 lg:py-8">
        <h2 className="text-start font-fraunces text-lg font-medium md:w-44 md:shrink-0 md:text-xl lg:text-2xl">
          Account
        </h2>
        <div className="flex w-full justify-between md:max-w-200">
          <Button
            type="submit"
            className="w-[45%] rounded-xs border-2 border-accent bg-accent text-sm text-background transition-all hover:bg-background hover:text-accent md:text-base lg:text-lg"
            onClick={logout}
          >
            Log out
          </Button>
          <Button
            onClick={handleDeletion}
            type="submit"
            className="w-[45%] rounded-xs border-2 border-accent bg-transparent text-sm text-accent transition-all hover:bg-accent hover:text-background md:text-base lg:text-lg"
          >
            Delete account
          </Button>
        </div>
        {error?.account && (
          <span className="text-sm text-accent md:text-base">
            {error.account}
          </span>
        )}
      </section>
    </div>
  );
}
