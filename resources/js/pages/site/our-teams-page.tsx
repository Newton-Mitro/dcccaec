import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Team } from '../../types/team';
import PageBanner from './components/page-banner';
import TeamCard from './components/team-card-item';

interface OurTeamPageProps {
    teams: Team[];
}

const OurTeamPage: React.FC<OurTeamPageProps> = ({ teams }) => {
    const hasTeams = teams && teams.length > 0;

    return (
        <>
            <Head title="Our Team" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Our Team" subtitle="We are a team of dedicated professionals who are passionate about what we do." />

                {/* Team Section */}
                <section id="team" className="my-44">
                    <div className="container-custom mx-auto px-4 transition-all duration-700 sm:px-6 md:px-6">
                        {hasTeams ? (
                            <div className="mt-12 flex flex-col md:gap-36">
                                {teams.map((team, index) => (
                                    <TeamCard key={index} member={team} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="mt-20 text-center text-muted-foreground">
                                <h2 className="mb-3 text-2xl font-semibold text-foreground">No Team Members Found</h2>
                                <p className="text-base text-gray-500">We’re currently building our amazing team. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default OurTeamPage;
