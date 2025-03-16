import { useState } from "react";

export default function ImageCustomizer() {
    const [image, setImage] = useState(null);
    const [styles, setStyles] = useState({});

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStyles((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Customize Your Image</h2>
            <input type="file" onChange={handleImageUpload} className="mb-4" />

            <div className="grid grid-cols-2 gap-4 mb-4">
                {["width", "height", "margin", "padding", "border", "borderRadius", "backgroundColor"].map((style) => (
                    <input
                        key={style}
                        type="text"
                        name={style}
                        placeholder={style.charAt(0).toUpperCase() + style.slice(1)}
                        value={styles[style] || ""}
                        onChange={handleChange}
                        className="border p-2"
                    />
                ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <div className="border p-4 flex justify-center items-center">
                {image && <img src={image} alt="Preview" style={styles} />}
            </div>
        </div>
    );
}
