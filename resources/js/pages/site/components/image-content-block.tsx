import React from 'react';

interface ImageContentBlockProps {
    heading?: string | null;
    sub_heading?: string | null;
    imageUrl?: string;
    content?: string | null;
    reverse?: boolean; // when true → image on right, text on left
}

const ImageContentBlock: React.FC<ImageContentBlockProps> = ({ heading, sub_heading, imageUrl, content, reverse = false }) => {
    const containerClass = reverse ? 'flex flex-col items-center gap-16 md:flex-row-reverse' : 'flex flex-col items-center gap-16 md:flex-row';

    const imageClass = reverse
        ? 'mt-6 mb-6 mx-auto h-80 w-80 bg-card object-cover transition-transform duration-300 hover:scale-110 md:ml-6 md:h-[500px] md:w-[500px]'
        : 'mt-6 mb-6 mx-auto h-80 w-80 bg-card object-cover transition-transform duration-300 hover:scale-110 md:mr-6 md:h-[500px] md:w-[500px]';

    const clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';

    return (
        <div className={containerClass}>
            <img alt="Custom Shape" src={imageUrl} className={imageClass} style={{ clipPath, shapeOutside: clipPath }} />

            <div className="">
                <div className="flex flex-col">
                    {heading && <h2 className="mb-1 font-chewy text-3xl text-accent">{heading}</h2>}
                    {sub_heading && <h3 className="mb-2 text-muted-foreground">{sub_heading}</h3>}
                    {heading && <div className="mx-auto mb-8 h-1 w-16 bg-secondary md:mx-0"></div>}
                </div>
                <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: content || '' }} />
            </div>
        </div>
    );
};

export default ImageContentBlock;
