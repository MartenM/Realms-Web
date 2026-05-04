import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const contestId = params['contest_id'];

    const allContests = {
        "summer-contest": {
            id: "summer-contest",
            title: "Summer Build Event 2026",
            message:
                "Summer is right around the corner! To get those vacation vibes flowing, we are hosting an official PixelWalker Summer Build Event.",
            contestUrl:
                "https://discord.com/channels/534079923573489667/1236752145554997352/1499794127431274496",
            contestUrlType: "discord",
        }
    };

    const selectedContest = allContests[contestId as keyof typeof allContests];

    return {
        contestId,
        contest: selectedContest ?? null
    };
};