document.addEventListener('DOMContentLoaded', function() {
    const experimentsContainer = document.getElementById('experiments-container');
    const experimentDisplay = document.querySelector('.experiment-display');
    const experimentFrame = document.getElementById('experiment-frame');
    const placeholderExperiment = document.querySelector('.placeholder-experiment');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const experimentDescription = document.getElementById('experiment-description');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const launchBtn = document.getElementById('launch-btn');
    const searchInput = document.querySelector('.search-box input');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const paginationContainer = document.getElementById('pagination');
    const pageInfo = document.getElementById('page-info');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // بيانات جميع تجارب PhET (مثال موسع)
    const experiments = {
        // الفيزياء
        'balloons': {
            url: 'https://phet.colorado.edu/sims/html/balloons-and-static-electricity/latest/balloons-and-static-electricity_all.html',
            title: 'البالونات والكهرباء الساكنة',
            description: 'تجربة البالونات والكهرباء الساكنة تتيح لك استكشاف تأثير الكهرباء الساكنة على البالونات. يمكنك فرك البالونات بأنسجة مختلفة ومراقبة كيفية تفاعلها مع الأسطح والأجسام الأخرى.',
            category: 'physics',
            level: 'مبتدئ',
            icon: 'wind'
        },
        'generator': {
            url: 'https://phet.colorado.edu/sims/html/generator/latest/generator_all.html',
            title: 'المولد الكهربائي',
            description: 'تجربة المولد الكهربائي تشرح مبدأ عمل المولدات التي تحول الطاقة الميكانيكية إلى طاقة كهربائية. يمكنك تغيير سرعة الدوران وعدد اللفات ومراقبة تأثير ذلك على التيار الكهربائي المتولد.',
            category: 'physics',
            level: 'متوسط',
            icon: 'bolt'
        },
        'optics': {
            url: 'https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html',
            title: 'البصريات الهندسية',
            description: 'تجربة البصريات الهندسية تقدم محاكاة للعدسات والمرايا وكيفية تفاعل الضوء معها. يمكنك تعديل بؤرة العدسة ومراقبة كيفية تكون الصور.',
            category: 'physics',
            level: 'متوسط',
            icon: 'eye'
        },
        'travoltage': {
            url: 'https://phet.colorado.edu/sims/html/john-travoltage/latest/john-travoltage_all.html',
            title: 'جون ترافولتاج',
            description: 'تجربة جون ترافولتاج تتيح لك استكشاف الكهرباء الساكنة مع شخصية جون. يمكنك تحريك قدم جون على السجادة ومراقبة كيفية تراكم الشحنات الكهربائية وتفريغها.',
            category: 'physics',
            level: 'مبتدئ',
            icon: 'bolt'
        },
        'circuit': {
            url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_all.html',
            title: 'بناء الدوائر الكهربائية',
            description: 'تجربة بناء الدوائر الكهربائية تتيح لك تصميم وبناء دوائر كهربائية باستخدام مكونات مختلفة مثل البطاريات والمقاومات والمفاتيح.',
            category: 'physics',
            level: 'متوسط',
            icon: 'bolt'
        },
        'pendulum': {
            url: 'https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_all.html',
            title: 'معمل البندول',
            description: 'تجربة معمل البندول تتيح لك استكشاف حركة البندول وتأثير عوامل مثل الكتلة والطول والجاذبية على حركته.',
            category: 'physics',
            level: 'مبتدئ',
            icon: 'weight-hanging'
        },
        
        // الكيمياء
        'gases': {
            url: 'https://phet.colorado.edu/sims/html/gases-intro/latest/gases-intro_all.html',
            title: 'مدخل إلى الغازات',
            description: 'تجربة مدخل إلى الغازات تشرح سلوك الغازات وفقًا للقوانين الأساسية مثل قانون بويل وقانون تشارلز. يمكنك تغيير درجة الحرارة والضغط والحجم ومراقبة تأثير ذلك على سلوك الجزيئات.',
            category: 'chemistry',
            level: 'مبتدئ',
            icon: 'temperature-high'
        },
        'molecules': {
            url: 'https://phet.colorado.edu/sims/html/build-a-molecule/latest/build-a-molecule_all.html',
            title: 'بناء الجزيئات',
            description: 'تجربة بناء الجزيئات تتيح لك تجميع الجزيئات من الذرات المختلفة ومراقبة كيفية ارتباطها معًا لتشكيل مركبات كيميائية.',
            category: 'chemistry',
            level: 'مبتدئ',
            icon: 'atom'
        },
        'reactions': {
            url: 'https://phet.colorado.edu/sims/html/reactants-products-and-leftovers/latest/reactants-products-and-leftovers_all.html',
            title: 'المتفاعلات والنواتج والفائض',
            description: 'تجربة المتفاعلات والنواتج والفائض تشرح مبادئ التفاعلات الكيميائية وتوازن المعادلات الكيميائية.',
            category: 'chemistry',
            level: 'متوسط',
            icon: 'flask'
        },
        'ph-scale': {
            url: 'https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_all.html',
            title: 'مقياس الأس الهيدروجيني',
            description: 'تجربة مقياس الأس الهيدروجيني تتيح لك استكشاف مفهوم الحموضة والقاعدية وقياس درجة الحموضة للمواد المختلفة.',
            category: 'chemistry',
            level: 'مبتدئ',
            icon: 'vial'
        },
        
        // الأحياء
        'natural-selection': {
            url: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html',
            title: 'الانتخاب الطبيعي',
            description: 'تجربة الانتخاب الطبيعي تتيح لك استكشاف كيفية تطور الكائنات الحية عبر الزمن استجابة للضغوط البيئية.',
            category: 'biology',
            level: 'متوسط',
            icon: 'dna'
        },
        'neuron': {
            url: 'https://phet.colorado.edu/sims/html/neuron/latest/neuron_all.html',
            title: 'الخلايا العصبية',
            description: 'تجربة الخلايا العصبية تتيح لك استكشاف كيفية عمل الخلايا العصبية ونقل الإشارات العصبية في الجسم.',
            category: 'biology',
            level: 'متقدم',
            icon: 'brain'
        },
        
        // الرياضيات
        'graphing': {
            url: 'https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_all.html',
            title: 'رسم الخطوط البيانية',
            description: 'تجربة رسم الخطوط البيانية تتيح لك استكشاف مفاهيم الميل والتقاطع ورسم المعادلات الخطية على المستوى الإحداثي.',
            category: 'math',
            level: 'مبتدئ',
            icon: 'chart-line'
        },
        'fractions': {
            url: 'https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_all.html',
            title: 'مدخل إلى الكسور',
            description: 'تجربة مدخل إلى الكسور تتيح لك استكشاف مفهوم الكسور وتمثيلها البصري وعمليات الجمع والطرح للكسور.',
            category: 'math',
            level: 'مبتدئ',
            icon: 'divide'
        },
        
        // علوم الأرض
        'plate-tectonics': {
            url: 'https://phet.colorado.edu/sims/html/plate-tectonics/latest/plate-tectonics_all.html',
            title: 'تكتونيات الصفائح',
            description: 'تجربة تكتونيات الصفائح تشرح كيفية تحرك الصفائح التكتونية وتأثير ذلك على تشكيل الجبال والزلازل والبراكين.',
            category: 'earth',
            level: 'متقدم',
            icon: 'globe-americas'
        },
        'greenhouse': {
            url: 'https://phet.colorado.edu/sims/html/greenhouse-effect/latest/greenhouse-effect_all.html',
            title: 'الاحتباس الحراري',
            description: 'تجربة الاحتباس الحراري تتيح لك استكشاف تأثير الغازات الدفيئة على درجة حرارة الغلاف الجوي وتأثيرها على المناخ.',
            category: 'earth',
            level: 'متوسط',
            icon: 'cloud-sun'
        },
        'volcano': {
            url: 'https://phet.colorado.edu/sims/html/volcano-plot/latest/volcano-plot_all.html',
            title: 'البركان',
            description: 'تجربة البركان تشرح كيفية تشكل البراكين وأنواعها المختلفة. يمكنك تعديل عوامل مثل لزوجة الصهارة وكمية الغاز ومراقبة تأثير ذلك على ثوران البركان.',
            category: 'earth',
            level: 'متوسط',
            icon: 'mountain'
        }
    };

    let experimentsArray = Object.keys(experiments).map(key => ({ ...experiments[key], id: key }));
    let filteredExperiments = experimentsArray;
    let selectedExperimentIndex = -1;
    const experimentsPerPage = 5;
    let currentPage = 1;

    // Functions
    function renderExperiments() {
        experimentsContainer.innerHTML = '';
        const start = (currentPage - 1) * experimentsPerPage;
        const end = start + experimentsPerPage;
        const experimentsToRender = filteredExperiments.slice(start, end);

        if (experimentsToRender.length === 0) {
            experimentsContainer.innerHTML = '<p style="text-align: center; color: var(--gray);">لا توجد تجارب تتطابق مع البحث.</p>';
        } else {
            experimentsToRender.forEach((exp, index) => {
                const experimentItem = document.createElement('div');
                experimentItem.classList.add('experiment-item', exp.category);
                if (selectedExperimentIndex !== -1 && filteredExperiments[selectedExperimentIndex].id === exp.id) {
                    experimentItem.classList.add('active');
                }
                experimentItem.innerHTML = `
                    <div class="experiment-icon">
                        <i class="fas fa-${exp.icon}"></i>
                    </div>
                    <div class="experiment-content">
                        <h3>${exp.title}</h3>
                        <p>${exp.description.split('. ')[0]}.</p>
                        <div class="experiment-meta">
                            <span><i class="fas fa-tag"></i> ${exp.category}</span>
                            <span><i class="fas fa-signal"></i> ${exp.level}</span>
                        </div>
                    </div>
                `;
                experimentItem.addEventListener('click', () => {
                    selectExperiment(exp.id);
                });
                experimentsContainer.appendChild(experimentItem);
            });
        }
        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredExperiments.length / experimentsPerPage);
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('div');
            pageBtn.classList.add('page-btn');
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderExperiments();
            });
            paginationContainer.appendChild(pageBtn);
        }

        pageInfo.textContent = `صفحة ${currentPage} من ${totalPages}`;
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            pageInfo.style.display = 'none';
        } else {
            paginationContainer.style.display = 'flex';
            pageInfo.style.display = 'block';
        }
    }

    function selectExperiment(id) {
        const experiment = experiments[id];
        if (!experiment) return;

        // Update active class
        document.querySelectorAll('.experiment-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.id === id) {
                item.classList.add('active');
            }
        });

        placeholderExperiment.style.display = 'none';
        loadingSpinner.style.display = 'block';
        experimentFrame.style.display = 'none';

        experimentFrame.src = experiment.url;
        experimentDescription.textContent = experiment.description;
        launchBtn.href = experiment.url;
        launchBtn.disabled = false;
        fullscreenBtn.disabled = false;
        
        const index = filteredExperiments.findIndex(exp => exp.id === id);
        selectedExperimentIndex = index;
        
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        if (selectedExperimentIndex === -1) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
        } else {
            prevBtn.disabled = selectedExperimentIndex === 0;
            nextBtn.disabled = selectedExperimentIndex === filteredExperiments.length - 1;
        }
    }

    // Event Listeners
    experimentFrame.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
        experimentFrame.style.display = 'block';
    });

    prevBtn.addEventListener('click', () => {
        if (selectedExperimentIndex > 0) {
            selectedExperimentIndex--;
            const newExperiment = filteredExperiments[selectedExperimentIndex];
            selectExperiment(newExperiment.id);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (selectedExperimentIndex < filteredExperiments.length - 1) {
            selectedExperimentIndex++;
            const newExperiment = filteredExperiments[selectedExperimentIndex];
            selectExperiment(newExperiment.id);
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterExperiments(searchTerm, document.querySelector('.category-btn.active').dataset.category);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            filterExperiments(searchInput.value.toLowerCase().trim(), category);
        });
    });

    function filterExperiments(searchTerm, category) {
        filteredExperiments = experimentsArray.filter(exp => {
            const matchesCategory = category === 'all' || exp.category === category;
            const matchesSearch = exp.title.toLowerCase().includes(searchTerm) || exp.description.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        currentPage = 1;
        selectedExperimentIndex = -1;
        updateNavigationButtons();
        renderExperiments();
    }
    
    fullscreenBtn.addEventListener('click', () => {
        if (experimentFrame.requestFullscreen) {
            experimentFrame.requestFullscreen();
        } else if (experimentFrame.mozRequestFullScreen) { /* Firefox */
            experimentFrame.mozRequestFullScreen();
        } else if (experimentFrame.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            experimentFrame.webkitRequestFullscreen();
        } else if (experimentFrame.msRequestFullscreen) { /* IE/Edge */
            experimentFrame.msRequestFullscreen();
        }
    });

    // Initial render
    filterExperiments('', 'all');
});