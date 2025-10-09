function SectionHeader({ heading, sub_heading }) {
    if (!heading && !sub_heading) return null; // nothing to render

    return (
        <div className="mb-6 flex flex-col items-center justify-center text-center">
            {heading && <h2 className="mb-1 font-chewy text-3xl text-accent">{heading}</h2>}
            {sub_heading && <h3 className="mb-2 text-muted-foreground">{sub_heading}</h3>}
            <div className="mx-auto mb-8 h-1 w-16 bg-secondary md:mx-0"></div>
        </div>
    );
}

export default SectionHeader;
