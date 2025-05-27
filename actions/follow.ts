"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        return followedUser;
    } catch (error) {
        throw new Error("Internal Error");
    };
};

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        if (!unfollowedUser || !unfollowedUser.following) {
            throw new Error("Invalid unfollow response");
        }

        revalidatePath("/");

        revalidatePath(`/${unfollowedUser.following.username}`);

        return unfollowedUser;
    } catch (error) {
        console.error("Unfollow Error:", error);
        throw new Error("Internal Error");
    }
};

