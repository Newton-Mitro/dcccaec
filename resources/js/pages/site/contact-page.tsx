import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/text-area';
import PageLayout from '../../layouts/page-layout';
import PageBanner from './components/page-banner';

const ContactPage = () => {
    const { settings } = usePage().props as any;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('site.send-message'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message sent successfully!');
                reset(); // clears all fields
            },
            onError: () => {
                toast.error('Please fix the errors and try again.');
            },
        });
    };

    return (
        <>
            <Head title="Contact Us" />
            <PageLayout>
                <PageBanner title="Contact Us" subtitle="Got an idea or a question? We’d love to hear from you." />

                <section className="container-custom mx-auto px-6 py-16">
                    <div className="grid gap-12 md:grid-cols-2">
                        {/* Info */}
                        <div>
                            <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Office</h3>
                                        <p>{settings.contact_address || 'Dhaka, Bangladesh'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p>{settings.contact_phone || '123-456-7890'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p>{settings.contact_email || 'hello@example.com'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-xl bg-white p-8 shadow dark:bg-gray-800">
                            <h2 className="mb-6 text-2xl font-semibold">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Name</label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Your Name" />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Subject</label>
                                    <Input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Subject of your message"
                                    />
                                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">Message</label>
                                    <Textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Your message..."
                                    />
                                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90">
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-6 w-full overflow-hidden rounded-xl border">
                        {/* Render Google Map Embed */}
                        <div className="h-[450px] w-full" dangerouslySetInnerHTML={{ __html: settings.contact_map_embed || '' }} />
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ContactPage;
