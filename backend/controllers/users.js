import User from "../models/User.js";

export const getUser = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        response.status(200).json(user);
    } catch (error) {
        response.status(404).json({
            error: error.message,
        });
    }
}

export const getUserFriends = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ id, firstName, lastName, occupation, location, picture }) => {
                return { id, firstName, lastName, occupation, location, picture };
            });
        response.status(200).json(formattedFriends);
    } catch (error) {
        response.status(404).json({
            error: error.message,
        });
    }
}

export const addRemoveFriend = async (request, response) => {
    try {
        const { userId, friendId } = request.params;
        const user = await User.friendById(userId);
        const friend = await User.friendById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((userId) => userId !== friendId);
            friend.friends = friend.friends.filter((userId) => userId !== userId);
        } else {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ id, firstName, lastName, occupation, location, picture }) => {
                return { id, firstName, lastName, occupation, location, picture };
            });
        response.status(200).json(formattedFriends);

    } catch (error) {
        response.status(404).json({
            error: error.message,
        })
    }
}