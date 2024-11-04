import React from 'react'
import Heading from '../Shared/Heading'
import Img1 from '../../../assets/blogs/blog-1.jpg'
import Img2 from '../../../assets/blogs/blog-2.jpg'
import Img3 from '../../../assets/blogs/blog-3.jpg'

const BlogData = [
  {
    title: "How to choose a perfect smartwatch",
    subtitle: "Choosing the appropriate smartwatch based on personal needs and traits",
    published: "Jan 20, 2024 by Diljit",
    image: Img1,
    aosDelay: "0"
  },
  {
    title: "How to choose a perfect gadget",
    subtitle: "Effect of professional life on choice of gadgets",
    published: "Jun 2, 2024 by Satya",
    image: Img2,
    aosDelay: "200"
  },
  {
    title: "How to choose a perfect VR headset",
    subtitle: "Use and need of VR headset for your professional and personal life",
    published: "Nov 16, 2024 by Kiran",
    image: Img3,
    aosDelay: "400"
  }
]
const Blogs = () => {
  return (
    <div className="my-12">
      <div className="container">
        {/* Header section */}
        <Heading title="Recent News" subtitle={"Explore our blogs"} />
        {/* Blog section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm-gap-4 md:gap-7">
          {/* Blog card */}
          {
            BlogData.map((data) => (
              <div data-aos="fade-up" data-aos-delay={data.aosDelay} key={data.title} className="bg-white dark:bg-gray-900">
                {/* Image section */}
                <div className="overflow-hidden rounded-2xl mb-2">
                  <img src={data.image} alt=""
                  className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                  />
                </div>
                {/* Content section */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-300">{data.published}</p>
                  <p className="font-bold line-clamp-1">{data.title}</p>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{data.subtitle}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs