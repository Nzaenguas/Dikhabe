import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking:{
                        none: {
                            blockedId: self.id,
                        },
                    },
                },
            },
            include: {
                following: {
                    include: {
                        stream: true,
                    },
                },
            },
        });

        return followedUsers;
    } catch {
        return [];
    }
};

export const isFollowingUser = async (id: string) => {
    try{
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id }
        });
        
        if (!otherUser) {
            throw new Error("User not found")
        }
        
        if (otherUser.id === self.id) {
            return true;
        }
        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            },
        });

        return !!existingFollow;
    } catch {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id){
        throw new Error("are you dumb");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });
    if (existingFollow) {
        throw new Error("Already following");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true,
        },
    });
    return  follow;
};

export const unfollowUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });
    if (!otherUser) {
        throw new Error("Target not found");
    }
    
    if (otherUser.id === self.id) {
        throw new Error("You're Weird")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Not following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};