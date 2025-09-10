// Blog Data
  const blogs = [
    {
      img: "/Blog-images/blog-1.png",
      link: "what-is-digital-marketing-beginners-guide.html",
      title: "What is Digital Marketing? A Beginner’s Guide for Students",
      desc: "Businesses are moving from traditional ads to digital marketing, leveraging online platforms for growth.For students, learning digital marketing offers valuable skills and career opportunities.",
      date: "July 15, 2025"
    },
    {
      img: "/Blog-images/blog-2.png",
      link: "traditional-vs-digital-marketing-for-students.html",
      title: "Traditional Marketing vs Digital Marketing: What Should Students Focus On?",
      desc: "Marketing has shifted from traditional methods like TV ads and billboards to digital marketing, which is cheaper and easier to measure. Students should focus on learning digital marketing for better career opportunities.",
      date: "July 15, 2025"
    },
    {
      img: "/Blog-images/blog-3.png",
      link: "digital-marketing-skills-in-demand-2025.html",
      title: "Best Digital Marketing Skills in Demand for 2025: Future-Proof Your Career",
      desc: "Digital marketing is not just an option; it is essential for businesses in every sector. With fast changes in technology",
      date: "July 15, 2025"
    },
    {
      img: "/Blog-images/blog-4.png",
      link: "digital-marketing-tools-to-kickstart-career.html",
      title: "7 Digital Marketing Tools to kickstart Your Career",
      desc: "If you are a beginner looking to build a career in the fast-growing digital field, the first step is to master the right digital marketing tools.",
      date: "July 15, 2025"
    },
    {
      img: "/Blog-images/blog5.png",
      link: "from-beginner-to-pro-digital-marketing-career.html",
      title: "From Beginner to Pro: How Digilift Academy Shapes Careers",
      desc: "Marketing has rapidly evolved from newspapers and billboards to modern digital platforms like search engines and social media, transforming how businesses connect with audiences.",
      date: "July 15, 2025"
    },
    {
      img: "/Blog-images/blog6.png",
      link: "ppc-advertising-boost-business.html",
      title: "PPC Advertising: How to Boost Your Business with Paid Campaigns",
      desc: "Fintech Digilift in Delhi offers expert PPC advertising training, helping businesses gain instant online visibility, boost traffic, and maximize conversions effectively.",
      date: "July 15, 2025"
    }
    ,
    {
      img: "/Blog-images/blog7.png",
      link: "affordable-digital-marketing-courses-after-12th.html",
      title: "Affordable Digital Marketing Courses After 12th – Learn & Earn at the Same Time",
      desc: "Start your career right after 12th with affordable digital marketing courses at Digilift Academy—gain industry-ready skills in months and even learn while you earn.",
      date: "July 15, 2025"
    }
    ,
    {
      img: "/Blog-images/blog8.png",
      link: "DigiLift-Academy.html",
      title: "DigiLift Academy: Where Innovation Meets Digital Marketing Education",
      desc: "DigiLift Academy offers affordable, hands-on digital marketing training with real-time experience and career opportunities. Perfect for beginners in Delhi NCR, it equips you with the skills to thrive in the digital world.",
      date: "July 15, 2025"
    }
  ];


  const blogsPerPage = 6; // ek page me 3 blogs
  let currentPage = 1;
  const blogsGrid = document.getElementById("Blogs-grid");
  const pagination = document.getElementById("pagination");

  function renderBlogs(page) {
    blogsGrid.innerHTML = "";
    const start = (page - 1) * blogsPerPage;
    const end = start + blogsPerPage;
    const paginatedBlogs = blogs.slice(start, end);

    paginatedBlogs.forEach(blog => {
      blogsGrid.innerHTML += `
        <div class="editor-card">
          <img src="${blog.img}" alt="News" loading="lazy">
          <div class="author">
            <img src="/images/profile.png" alt="Author" loading="lazy">
            <span>${blog.date}</span>
          </div>
          <a href="${blog.link}" class="animated-underline">
            <h3>${blog.title}</h3>
          </a>
          <p>${blog.desc}</p>
        </div>
      `;
    });
    renderPagination();
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
        <span class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</span>
      `;
    }

    document.querySelectorAll(".page-number").forEach(btn => {
      btn.addEventListener("click", function () {
        currentPage = parseInt(this.dataset.page);
        renderBlogs(currentPage);
        document.querySelector(".top-navbar").scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderBlogs(currentPage);
       document.querySelector(".top-navbar").scrollIntoView({ behavior: "smooth" });
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderBlogs(currentPage);
      document.querySelector(".top-navbar").scrollIntoView({ behavior: "smooth" });
    }
  });

  renderBlogs(currentPage);