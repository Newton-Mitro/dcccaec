function ImageContentRender() {
    return (
        <div className="container-custom mx-auto my-16 w-full space-y-14 p-6">
            <div className="mb-30 w-full space-y-10 lg:container">
                <div className="mb-10 flex gap-10">
                    <img
                        alt="Custom Shape"
                        className="mx-auto mt-6 mb-6 h-80 w-80 bg-card object-cover transition-transform duration-500 hover:scale-105 md:mr-6 md:h-[500px] md:w-[500px]"
                        src="http://localhost:8000/storage/uploads/images/28.jpg"
                        style={{
                            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                            shapeOutside: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                    />

                    <div className="prose max-w-full dark:prose-invert">
                        <div>
                            <div>
                                <h2>Our Vision</h2>
                                <p className="mt-4">
                                    Our Vision is a second home for our children, where their growing needs are fulfilled in a safe, healthy,
                                    positive, and creative environment — where their childhood will remain the happiest days of their lives.
                                </p>
                            </div>

                            <div>
                                <h2>Our Mission</h2>
                                <p className="mt-4">
                                    The Mission is to provide a creative environment conducive to the optimal growth and holistic development of
                                    children.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clear-both" />
                <div className="py-6" />
            </div>
        </div>
    );
}

export default ImageContentRender;
