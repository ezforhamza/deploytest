// src/components/post/PostContent.jsx

import React from "react";
import { colors, typography } from "../../styles/tokens";

const PostContent = ({ content, tags = [], images = [] }) => {
  // Check if content is a string (simple post) or object (structured post)
  const isSimpleContent = typeof content === 'string';
  
  return (
    <div className="relative w-full">
      {!isSimpleContent && content.title && (
        <h4
          className="w-full text-black text-base sm:text-lg font-medium leading-[150%] m-0 mb-4"
          style={{ fontFamily: typography.fontFamily.primary }}
        >
          {content.title}
        </h4>
      )}

      {/* Post Description or Simple Content */}
      <p
        className="w-full text-sm sm:text-base font-normal leading-[150%] m-0 whitespace-pre-line"
        style={{
          fontFamily: typography.fontFamily.primary,
          color: colors.text,
        }}
      >
        {isSimpleContent ? content : content.description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs font-medium rounded-md"
              style={{
                backgroundColor: colors.secondary + "20",
                color: colors.primary,
                fontFamily: typography.fontFamily.primary,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="mt-4">
          {images.length === 1 && (
            <img
              src={images[0]}
              alt="Post image"
              className="w-full rounded-lg object-cover"
              style={{ height: "auto" }}
            />
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full rounded-lg object-cover"
                  style={{ height: "auto" }}
                />
              ))}
            </div>
          )}

          {images.length >= 3 && (
            <div className="grid grid-cols-2 gap-2">
              <img
                src={images[0]}
                alt="Post image 1"
                className="w-full rounded-lg object-cover"
                style={{ height: "auto" }}
              />
              <div className="grid grid-rows-2 gap-2">
                <img
                  src={images[1]}
                  alt="Post image 2"
                  className="w-full rounded-lg object-cover"
                  style={{ height: "auto" }}
                />
                <div className="relative">
                  <img
                    src={images[2]}
                    alt="Post image 3"
                    className="w-full rounded-lg object-cover"
                    style={{ height: "auto" }}
                  />
                  {images.length > 3 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-medium">
                        +{images.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostContent;
