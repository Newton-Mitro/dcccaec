import { Head, Link } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Service } from '../../types/service';
import PageBanner from './components/page-banner';
import ServiceCard from './components/service-card';

interface ServicePageProps {
    programs: Service[];
}

const ServicePage: React.FC<ServicePageProps> = ({ programs }) => {
    return (
        <>
            <Head title="Programs" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Programs" subtitle="We provide a wide range of programs to meet your needs." />

                {/* Services List */}
                <section className="my-44">
                    <div className={`container-custom mx-auto px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                        <div className="mt-12 flex flex-col md:gap-36">
                            {programs.map((service, index) => (
                                <Link key={service.id} href={route('site.programs.show', service.id)} className="">
                                    <ServiceCard key={service.id} service={service} index={index} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ServicePage;
