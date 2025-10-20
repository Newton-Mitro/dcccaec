import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/text-area';
import PageLayout from '../../layouts/page-layout';
import PageBanner from './components/page-banner';

const ContactPage = () => {
    const { settings } = usePage().props as any;

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        math_answer: '',
        num1: 0,
        num2: 0,
    });

    // 🔢 Generate random math challenge
    const generateMath = () => {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        setNum1(a);
        setNum2(b);
        setData('num1', a);
        setData('num2', b);
    };

    useEffect(() => {
        generateMath();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('site.send-message'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Message sent successfully!');
                reset();
                generateMath(); // regenerate math after success
            },
            onError: () => {
                toast.error('Please fix the errors and try again.');
                generateMath(); // new math challenge if wrong
            },
        });
    };

    return (
        <>
            <Head title="Contact Us" />
            <PageLayout>
                <PageBanner title="Contact Us" subtitle="Got an idea or a question? We’d love to hear from you." />

                <section className="container-custom mx-auto px-6 py-16">
                    <div className="grid items-center gap-12 md:grid-cols-2">
                        {/* Left: Info */}
                        <div>
                            <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-accent" />
                                    <div>
                                        <h3 className="font-semibold">Office</h3>
                                        <p>{settings.contact_address || 'Dhaka, Bangladesh'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-accent" />
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p>{settings.contact_phone || '123-456-7890'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-accent" />
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p>{settings.contact_email || 'hello@example.com'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="rounded-xl bg-card p-8 shadow">
                            <h2 className="mb-6 text-2xl font-semibold">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-2">
                                {/* Name */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">Name</label>
                                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Your Name" />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Email */}
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

                                {/* Subject */}
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

                                {/* Message */}
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

                                {/* Math CAPTCHA */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Are you human? What is {num1} + {num2}?
                                    </label>
                                    <Input
                                        type="number"
                                        value={data.math_answer}
                                        onChange={(e) => setData('math_answer', e.target.value)}
                                        placeholder="Your answer"
                                    />
                                    {errors.math_answer && <p className="text-sm text-red-500">{errors.math_answer}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90">
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="mt-16 w-full overflow-hidden rounded-xl border">
                        <div
                            className="h-[450px] w-full"
                            dangerouslySetInnerHTML={{
                                __html:
                                    settings.contact_map_embed ||
                                    `<iframe 
                                        src="https://maps.google.com/maps?q=Dhaka%2C%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                        width="100%" 
                                        height="450" 
                                        style="border:0;" 
                                        allowFullScreen="" 
                                        loading="lazy">
                                    </iframe>`,
                            }}
                        />
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ContactPage;
