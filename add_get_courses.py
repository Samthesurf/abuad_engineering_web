
#!/usr/bin/env python3
"""
Extract GET (General Engineering Technology) courses from the COREN accreditation PDFs
and add them to collegeData.js. These are shared college-wide courses taken by all
engineering departments but were missed during initial extraction because the parser
only looked for COE/CPE/EEE-prefixed courses.
"""

import re
import json
import copy

# ============================================================
# GET COURSE DATA extracted from Self-Study-Computer.pdf
# (identical content in Self-Study-Electrical.pdf)
# Sources:
#   - Curriculum tables (units, status, LH, PH)
#   - Chapter 4 / Section 5 Course Description (Learning Outcomes, Course Contents)
# ============================================================

GET_COURSES = {
    "GET101": {
        "code": "GET 101",
        "title": "Engineer in Society",
        "semester": "First Semester",
        "credits": 1,
        "contactHours": "Lecture - One hour lecture per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "COREN (2024). Engineering Regulations and Code of Conduct for Engineering Practitioners in Nigeria.",
            "UNESCO (2021). Engineering for Sustainable Development: Delivering on the Sustainable Development Goals."
        ],
        "overview": "This course introduces students to the engineering profession, its history, philosophy, and the relationship between science, engineering, and technology. It covers the engineering family (engineers, technologists, technicians, and craftsmen), professional bodies and societies, the engineers' code of conduct and ethics, and engineering literacy. The course also addresses sustainable development goals (SDGs), innovation, infrastructures, nation building, and the role of engineering in the economy, politics, and business. Safety and risk analysis in engineering practice, engineering competency skills (curriculum overview, technical, soft, and digital skills), and guest seminars from professional engineering associations are integral components.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Differentiate between science, engineering and technology, and relate them to innovation", "pos": "PO1, PO6"},
            {"id": "CLO 2", "desc": "Distinguish between the different cadres of engineering: engineers, technologists, technicians and craftsmen and their respective roles and competencies", "pos": "PO6, PO8"},
            {"id": "CLO 3", "desc": "Identify and distinguish between the relevant professional bodies in engineering", "pos": "PO6, PO12"},
            {"id": "CLO 4", "desc": "Categorise the goals of global development or sustainable development goals (SDGs)", "pos": "PO7, PO6"},
            {"id": "CLO 5", "desc": "Identify and evaluate safety and risk in engineering practice", "pos": "PO6, PO8"}
        ],
        "outlines": [
            "Week 1-3: History, evolution and philosophy of science, engineering and technology",
            "Week 4-6: The engineering profession: cadres, roles, competencies, professional bodies",
            "Week 7-9: Engineers' code of conduct, ethics, and engineering literacy",
            "Week 10-12: Sustainable development goals (SDGs), innovation, nation building",
            "Week 13-15: Safety and risk analysis; guest seminars from professional associations"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Guest seminars and invited lectures from different engineering professional associations are integrated into the course delivery. Continuous assessment and a final examination are administered."
    },
    "GET102": {
        "code": "GET 102",
        "title": "Engineering Graphics and Solid Modelling I",
        "semester": "Second Semester",
        "credits": 2,
        "contactHours": "Lecture - One hour per week, Practical - Three hours per week",
        "location": "College Engineering Drawing Studio",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Autodesk (2023). Fusion 360: Introduction to Parametric Modeling and Design.",
            "Bhatt, N. D. & Panchal, V. M. (2020). Engineering Drawing: Plane and Solid Geometry, 55th Edition. Charotar Publishing House."
        ],
        "overview": "This course introduces design thinking and engineering graphics. Students learn first and third angle orthogonal projections, isometric projections, sectioning, conventional practices, conic sections and development. The course covers freehand and guided sketching (pictorial and orthographic), visualisation and solid modelling in design, prototyping and product-making. Topics include user interfaces, design, drawing, animation, rendering and simulation workspaces, sketching of 3D objects, viewports and sectioning to shop drawings in orthographic projections and perspectives, automated viewports, sheet metal and surface modelling, and material selection and rendering. The course uses professional design tools such as Fusion 360, SolidWorks, Solid Edge or equivalent.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Have a good grasp of design thinking and apply it to solving simple everyday and complex problems", "pos": "PO3, PO4"},
            {"id": "CLO 2", "desc": "Recognize the fundamental concepts of engineering drawing and graphics", "pos": "PO1, PO5"},
            {"id": "CLO 3", "desc": "Show skills to represent engineering objects in actionable solid models suitable for simulation and analyses", "pos": "PO3, PO5"},
            {"id": "CLO 4", "desc": "Analyse solid models for strength and cost", "pos": "PO2, PO4"},
            {"id": "CLO 5", "desc": "Prepare objects for modern production and manufacturing techniques of additive and subtractive manufacturing", "pos": "PO3, PO5"},
            {"id": "CLO 6", "desc": "Recognise that engineering is multidisciplinary: mechanical, electrical and other physical structures are modelled in context", "pos": "PO6, PO9"},
            {"id": "CLO 7", "desc": "Analyse and master the basics of mechanical and thermal loads in engineering systems", "pos": "PO1, PO2"}
        ],
        "outlines": [
            "Week 1-3: Introduction to design thinking and engineering graphics; orthogonal projections",
            "Week 4-6: Isometric projections, sectioning, conic sections and development",
            "Week 7-9: Freehand and guided sketching; visualisation and solid modelling",
            "Week 10-12: Design, drawing, animation, rendering and simulation workspaces",
            "Week 13-15: Sheet metal and surface modelling; material selection and rendering"
        ],
        "lecturePlans": "Lectures and practical sessions hold on scheduled times at the College Engineering Drawing Studio. Students are expected to complete design projects using professional CAD tools such as Fusion 360, SolidWorks, or Solid Edge. Continuous assessment includes practical design assignments and a final examination."
    },
    "GET201": {
        "code": "GET 201",
        "title": "Applied Electricity I",
        "semester": "First Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Hughes, E. & Hiley, J. (2020). Hughes Electrical and Electronic Technology, 12th Edition. Pearson Education.",
            "Theraja, B. L. & Theraja, A. K. (2021). A Textbook of Electrical Technology: Volume I - Basic Electrical Engineering. S. Chand Publishing."
        ],
        "overview": "This course covers the fundamental concepts of electricity and electrical DC circuits. Topics include electric fields, charges, magnetic fields, current, B-H curves, Kirchhoff's laws, superposition, Thevenin and Norton theorems, reciprocity, and RL, RC, RLC circuits. The course also addresses DC and AC bridges, resistance, capacitance, and inductance measurement, transducers, single phase circuits, complex j-notation, AC circuits, impedance, admittance, and susceptance. Students learn to state, explain, and apply basic DC circuit theorems and basic AC circuit theory to the solution of simple circuits.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Discuss the fundamental concepts of electricity and electrical DC circuits", "pos": "PO1, PO2"},
            {"id": "CLO 2", "desc": "State, explain and apply the basic DC circuit theorems", "pos": "PO1, PO2, PO3"},
            {"id": "CLO 3", "desc": "Explain the basic AC circuit theory", "pos": "PO1, PO2"},
            {"id": "CLO 4", "desc": "Apply AC circuit theory to the solution of simple circuits", "pos": "PO2, PO3"}
        ],
        "outlines": [
            "Week 1-3: Fundamental concepts: electric fields, charges, magnetic fields, current, B-H curves",
            "Week 4-6: Kirchhoff's laws, superposition, Thevenin and Norton theorems, reciprocity",
            "Week 7-9: RL, RC, RLC circuits; DC and AC bridges; resistance, capacitance, inductance measurement",
            "Week 10-12: Transducers, single phase circuits, complex j-notation",
            "Week 13-15: AC circuits, impedance, admittance, and susceptance; revision"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET203": {
        "code": "GET 203",
        "title": "Engineering Graphics and Solid Modeling II",
        "semester": "First Semester",
        "credits": 2,
        "contactHours": "Lecture - One hour per week, Practical - Three hours per week",
        "location": "College Engineering Drawing Studio",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Autodesk (2023). Fusion 360: Advanced Parametric Modeling and Design.",
            "Shih, R. H. (2022). Parametric Modeling with SOLIDWORKS 2022. SDC Publications."
        ],
        "overview": "This course builds on GET 102 and advances students' skills in engineering graphics and solid modeling. Topics include projection of lines, auxiliary views and mixed projection, preparation of detailed working production drawings, semi-detailed drawings, and conventional presentation methods. Students work with solid, surface and shell modeling, faces, bodies and surface intersections, component-based design, component assembly and motion constraints, constrained motions and animation. The course introduces electronics modeling, electronics board layout preparation, component libraries and schematic design. It covers parametric modeling and adaptive design, simulation for material optimization, design for manufacturing, additive and subtractive manufacturing, production for 3D printing, laser cutting and CNC machinery, and assembly drawing of a plant.",
        "prerequisites": "GET 102",
        "clos": [
            {"id": "CLO 1", "desc": "Apply mastery of projections to prepare detailed working drawings of objects and designs", "pos": "PO1, PO3, PO5"},
            {"id": "CLO 2", "desc": "Develop skills in parametric design for optimal specification of materials and systems to meet needs", "pos": "PO2, PO3, PO5"},
            {"id": "CLO 3", "desc": "Analyze and optimize designs on the basis of strength and material minimization", "pos": "PO2, PO4, PO5"},
            {"id": "CLO 4", "desc": "Recognise and understand the practical link between theoretical perspectives and design to excite creativity and innovation", "pos": "PO3, PO4, PO12"},
            {"id": "CLO 5", "desc": "Translate thoughts and excitements to produce shop drawings for multi-physical, multidisciplinary design", "pos": "PO3, PO5, PO9"}
        ],
        "outlines": [
            "Week 1-3: Projection of lines, auxiliary views and mixed projection; detailed working drawings",
            "Week 4-6: Solid, surface and shell modeling; component-based design and assembly",
            "Week 7-9: Electronics modeling; board layout; component libraries and schematic design",
            "Week 10-12: Parametric modeling and adaptive design; simulation for material optimization",
            "Week 13-15: Design for manufacturing; additive/subtractive manufacturing; 3D printing, laser cutting, CNC"
        ],
        "lecturePlans": "Lectures and practical sessions hold on scheduled times at the College Engineering Drawing Studio. Students complete advanced design projects using professional CAD tools. Continuous assessment includes design assignments, practical projects, and a final examination."
    },
    "GET205": {
        "code": "GET 205",
        "title": "Fundamentals of Fluid Mechanics",
        "semester": "First Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Cengel, Y. A. & Cimbala, J. M. (2021). Fluid Mechanics: Fundamentals and Applications, 4th Edition. McGraw-Hill.",
            "Fox, R. W., McDonald, A. T. & Pritchard, P. J. (2020). Introduction to Fluid Mechanics, 9th Edition. Wiley."
        ],
        "overview": "This course covers fluid properties, hydrostatics, and fluid dynamics using principles of mass, momentum and energy conservation from a control volume approach. Topics include flow measurements in pipes, dimensional analysis and similitude, two-dimensional flows, and hydropower systems. Students learn to explain fluid properties, determine forces in static fluids and fluids in motion, assess floating body stability, determine the effect of various instruments (valves, orifices, bends and elbows) on fluid flow in pipes, measure flow parameters with venturi meters, orifice meters, weirs and other devices, perform calculations based on conservation principles, conduct dimensional analysis, and specify pumps and turbines for engineering applications.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Explain the properties of fluids", "pos": "PO1"},
            {"id": "CLO 2", "desc": "Determine forces in static fluids and fluids in motion", "pos": "PO1, PO2"},
            {"id": "CLO 3", "desc": "Determine whether a floating body will be stable", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 4", "desc": "Determine the effect of various instruments (valves, orifices, bends and elbows) on fluid flow in pipes", "pos": "PO2, PO4"},
            {"id": "CLO 5", "desc": "Measure flow parameters with venturi meters, orifice meters, weirs and others", "pos": "PO4, PO5"},
            {"id": "CLO 6", "desc": "Perform calculations based on principles of mass, momentum and energy conservation", "pos": "PO1, PO2"},
            {"id": "CLO 7", "desc": "Perform dimensional analysis and simple fluid modelling problems", "pos": "PO2, PO4"},
            {"id": "CLO 8", "desc": "Specify the type and capacity of pumps and turbines for engineering applications", "pos": "PO3, PO4, PO5"}
        ],
        "outlines": [
            "Week 1-3: Fluid properties, hydrostatics",
            "Week 4-6: Fluid dynamics using principles of mass, momentum and energy conservation",
            "Week 7-9: Control volume approach; flow measurements in pipes",
            "Week 10-12: Dimensional analysis and similitude; two-dimensional flows",
            "Week 13-15: Hydropower systems; pumps and turbines; revision"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial and practical sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET207": {
        "code": "GET 207",
        "title": "Applied Mechanics",
        "semester": "First Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Hibbeler, R. C. (2022). Engineering Mechanics: Statics and Dynamics, 15th Edition. Pearson.",
            "Beer, F. P., Johnston, E. R. & Mazurek, D. F. (2020). Vector Mechanics for Engineers: Statics and Dynamics, 12th Edition. McGraw-Hill."
        ],
        "overview": "This course covers forces, moments, couples, equilibrium of simple structures and machine parts, and friction. Topics include first and second moments of area, centroids, kinematics of particles and rigid bodies in plane motion, Newton's laws of motion, kinetic energy, and momentum analysis. Students learn to explain the fundamental principles of applied mechanics, particularly equilibrium analysis, friction, kinematics and momentum; identify, formulate, and solve complex engineering problems by applying principles of engineering, science, mathematics and applied mechanics; synthesize Newtonian Physics with static analysis to determine the complete load impact (net forces, shears, torques, and bending moments) on all components of a structure; and apply engineering design principles to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Explain the fundamental principles of applied mechanics, particularly equilibrium analysis, friction, kinematics and momentum", "pos": "PO1, PO2"},
            {"id": "CLO 2", "desc": "Identify, formulate, and solve complex engineering problems by applying principles of engineering, science, mathematics and applied mechanics", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 3", "desc": "Synthesize Newtonian Physics with static analysis to determine the complete load impact (net forces, shears, torques, and bending moments) on all components of a structure", "pos": "PO1, PO2, PO3"},
            {"id": "CLO 4", "desc": "Apply engineering design principles to produce solutions that meet specified needs with consideration of public health, safety, and welfare, as well as global, cultural, social, environmental, and economic factors", "pos": "PO3, PO6, PO7"}
        ],
        "outlines": [
            "Week 1-3: Forces, moments, couples; equilibrium of simple structures and machine parts",
            "Week 4-6: Friction; first and second moments of area; centroids",
            "Week 7-9: Kinematics of particles and rigid bodies in plane motion",
            "Week 10-12: Newton's laws of motion; kinetic energy and momentum analysis",
            "Week 13-15: Applications to structural analysis; revision"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET209": {
        "code": "GET 209",
        "title": "Engineering Mathematics I",
        "semester": "First Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Kreyszig, E. (2020). Advanced Engineering Mathematics, 10th Edition. Wiley.",
            "Stroud, K. A. & Booth, D. J. (2020). Engineering Mathematics, 8th Edition. Red Globe Press."
        ],
        "overview": "This course covers limits, continuity, differentiation, introduction to linear first order differential equations, partial and total derivatives, composite functions, matrices and determinants, vector algebra, vector calculus, and directional derivatives. Students learn to solve qualitative problems based on vector and matrix analyses such as linear independence and dependence of vectors, rank, etc.; describe the concepts of limit theory and nth order differential equations and their applications to physical phenomena; solve problems of differentiation of functions of two variables and maximization and minimization of functions of several variables; describe applications of double and triple integration in finding area and volume of engineering solids; explain ordinary differential equations and applications; develop mathematical models of linear differential equations; and analyse basic engineering models through partial differential equations such as wave equation, heat conduction equation, etc., as well as Fourier series, initial conditions and its applications to different engineering processes.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Solve qualitative problems based on vector and matrix analyses such as linear independence and dependence of vectors, rank etc.", "pos": "PO1, PO2"},
            {"id": "CLO 2", "desc": "Describe the concepts of limit theory and nth order differential equations and their applications to physical phenomena", "pos": "PO1, PO2"},
            {"id": "CLO 3", "desc": "Solve problems of differentiation of functions of two variables and know about maximization and minimization of functions of several variables", "pos": "PO1, PO2"},
            {"id": "CLO 4", "desc": "Describe applications of double and triple integration in finding area and volume of engineering solids, and explain qualitative applications of Gauss, Stoke's and Green's theorem", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 5", "desc": "Explain ordinary differential equations and applications, and develop mathematical models of linear differential equations", "pos": "PO1, PO2, PO3"},
            {"id": "CLO 6", "desc": "Analyse basic engineering models through partial differential equations such as wave equation, heat conduction equation, etc., as well as Fourier series, initial conditions and its applications to different engineering processes", "pos": "PO1, PO2, PO4"}
        ],
        "outlines": [
            "Week 1-3: Limits, continuity, differentiation; linear first order differential equations",
            "Week 4-6: Partial and total derivatives; composite functions",
            "Week 7-9: Matrices and determinants; vector algebra",
            "Week 10-12: Vector calculus; directional derivatives",
            "Week 13-15: Applications to engineering problems; revision"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET211": {
        "code": "GET 211",
        "title": "Computing and Software Engineering",
        "semester": "First Semester",
        "credits": 3,
        "contactHours": "Lecture - Two hours per week, Practical - Three hours per week",
        "location": "College Computer Laboratory",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Deitel, P. & Deitel, H. (2020). Python for Programmers. Pearson.",
            "Pressman, R. S. & Maxim, B. R. (2020). Software Engineering: A Practitioner's Approach, 9th Edition. McGraw-Hill."
        ],
        "overview": "This course introduces students to computers and computing, including computer organisation (data processing, memory, registers and addressing schemes), Boolean algebra, floating-point arithmetic, representation of non-numeric information, problem-solving and algorithm development, coding (solution design using flowcharts and pseudo codes). Topics include data models and data structures, computer software and operating systems, computer operators and operators' precedence, components of computer programs, introduction to object-oriented, structured and visual programming, use of MATLAB in engineering applications, ICT fundamentals, Internet of Things (IoT), and elements of software engineering. Students develop competence in designing, evaluating, and adapting software processes and tools through practical object-oriented programming exposure taught in concrete terms with a modern language such as Python, Java or C++.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Describe and apply computing, software engineering knowledge, best practices, and standards appropriate for complex engineering software systems", "pos": "PO1, PO5"},
            {"id": "CLO 2", "desc": "Develop competence in designing, evaluating, and adapting software processes and tools for advanced development projects through practical OOP exposure", "pos": "PO2, PO3, PO5"},
            {"id": "CLO 3", "desc": "Use widely available libraries to prepare for machine learning, graphics and design simulations", "pos": "PO3, PO5"},
            {"id": "CLO 4", "desc": "Develop skills in eliciting user needs and designing an effective software solution", "pos": "PO3, PO4, PO10"},
            {"id": "CLO 5", "desc": "Recognise human, security, social, and entrepreneurial issues and responsibilities relevant to engineering software and digitalisation of services", "pos": "PO6, PO7, PO8"},
            {"id": "CLO 6", "desc": "Acquire capabilities that can further be developed to make them productively employable by means of short Internet courses in specific areas", "pos": "PO5, PO9, PO12"}
        ],
        "outlines": [
            "Week 1-3: Introduction to computers and computing; computer organisation; Boolean algebra",
            "Week 4-6: Problem-solving and algorithm development; flowcharts and pseudo codes",
            "Week 7-9: Data models and data structures; computer software and operating systems",
            "Week 10-12: Object-oriented, structured and visual programming; MATLAB applications",
            "Week 13-15: IoT, elements of software engineering; practical programming project"
        ],
        "lecturePlans": "Lectures and practical sessions hold on scheduled times at the College Computer Laboratory. Students complete hands-on programming exercises and a course project. Continuous assessment includes practical programming assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET204": {
        "code": "GET 204",
        "title": "Students Workshop Practice",
        "semester": "Second Semester",
        "credits": 2,
        "contactHours": "Lecture - One hour per week, Practical - Three hours per week",
        "location": "College Engineering Workshop",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Chapman, W. A. J. (2020). Workshop Technology: Part 1, 5th Edition. Routledge.",
            "Raghuwanshi, B. S. (2019). A Course in Workshop Technology: Volume I - Manufacturing Processes. Dhanpat Rai & Co."
        ],
        "overview": "This course comprises general, mechanical and electrical workshop components providing supervised hands-on experience in safe usage of tools and machines. Students learn to use measuring instruments (calipers, micrometers, gauges, sine bar, wood planners, saws, sanders, and pattern making). The machine shop component covers lathe work, shaping, milling, grinding, reaming, metal spinning, hand tools, gas and arc welding, cutting, brazing and soldering, and foundry practice. Topics include industrial safety and accident prevention, ergonomics, metrology, casting processes, metal forming processes (hot-working and cold-working: forging, press-tool work, spinning, etc.), metal joining processes (welding, brazing and soldering), heat treatment, material removal processes, machine tools and classification, simple theory of metal cutting, tool action and cutting forces, and introduction to CNC machines. The electrical component covers identification, use and care of electrical and electronic components (resistors, inductors, capacitors, diodes and transistors), electric circuits and wiring schemes, analogue and digital measurements, and household and industrial energy consumption and conservation.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Identify various basic hand and machine tools, analogue and digital measurement devices and instruments, and acquire skills in their effective use and maintenance", "pos": "PO1, PO5"},
            {"id": "CLO 2", "desc": "Practically apply basic engineering technologies, including metrology, casting, metal forming and joining, materials removal, machine tooling and CNC machining technology", "pos": "PO1, PO3, PO5"},
            {"id": "CLO 3", "desc": "Master workshop and industrial safety practices, accident prevention and ergonomics", "pos": "PO6, PO8"},
            {"id": "CLO 4", "desc": "Physically recognize different electrical and electronic components like resistances, inductances, capacitances, diodes, transistors and their ratings", "pos": "PO1, PO4"},
            {"id": "CLO 5", "desc": "Connect electric circuits, understand different wiring schemes, and check ratings of common household electrical appliances and their basic maintenance", "pos": "PO1, PO3"},
            {"id": "CLO 6", "desc": "Determine household and industrial energy consumption, and understand practical energy conservation measures", "pos": "PO7, PO5"}
        ],
        "outlines": [
            "Week 1-3: Workshop safety, measuring instruments, bench work and hand tools",
            "Week 4-6: Machine shop: lathe work, shaping, milling, grinding, metal spinning",
            "Week 7-9: Welding, brazing, soldering; foundry practice; casting processes",
            "Week 10-12: Metal forming and joining; heat treatment; introduction to CNC machines",
            "Week 13-15: Electrical/electronic components; wiring schemes; energy measurement and conservation"
        ],
        "lecturePlans": "Practical sessions hold on scheduled times at the College Engineering Workshop. Students work in supervised groups and maintain workshop logbooks. Continuous assessment is based on practical tasks, workshop reports, and a practical examination."
    },
    "GET206": {
        "code": "GET 206",
        "title": "Fundamentals of Engineering Thermodynamics",
        "semester": "Second Semester",
        "credits": 2,
        "contactHours": "Lecture - Two hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Cengel, Y. A. & Boles, M. A. (2020). Thermodynamics: An Engineering Approach, 9th Edition. McGraw-Hill.",
            "Moran, M. J., Shapiro, H. N. & Boettner, D. D. (2021). Fundamentals of Engineering Thermodynamics, 9th Edition. Wiley."
        ],
        "overview": "This course covers the basic concepts, definitions and laws of thermodynamics including quantitative relations of the Zeroth, First, Second and Third laws. Topics include properties of pure substances: the two-property rule (P-V-T behaviour of pure substances and perfect gases), state diagrams, the principle of corresponding states, compressibility relations, reduced pressure, reduced volume, temperature, pseudo-critical constants. The course covers the ideal gas (specific heat, polytropic processes), ideal gas cycles (Carnot, thermodynamic cycles, turbines, steam and gas, refrigeration), the First Law of Thermodynamics (heat and work, applications to open and closed systems), the steady flow energy equation (Bernoulli's equation) and its application, the Second Law of Thermodynamics, heat cycles and efficiencies. Students learn to calculate thermal efficiency and coefficient of performance for heat engines, refrigerators and heat pumps.",
        "prerequisites": "Nil",
        "clos": [
            {"id": "CLO 1", "desc": "Describe basic concepts of thermodynamics, quantitative relations of Zeroth, First, Second and Third laws", "pos": "PO1"},
            {"id": "CLO 2", "desc": "Define and explain system (surrounding, closed and open system), control volume and control mass, extensive and intensive properties", "pos": "PO1, PO2"},
            {"id": "CLO 3", "desc": "Calculate absolute and gage pressure, absolute temperature, and changes in kinetic, potential, enthalpy and internal energy", "pos": "PO1, PO2"},
            {"id": "CLO 4", "desc": "Evaluate the properties of pure substances using property diagrams and tables; arrange ideal and real gas equations of state", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 5", "desc": "Formulate and apply the First Law of Thermodynamics for closed and open systems", "pos": "PO1, PO2, PO3"},
            {"id": "CLO 6", "desc": "Evaluate thermodynamic applications using the Second Law of Thermodynamics", "pos": "PO2, PO4"},
            {"id": "CLO 7", "desc": "Calculate thermal efficiency and coefficient of performance for heat engines, refrigerators and heat pumps", "pos": "PO2, PO3"}
        ],
        "outlines": [
            "Week 1-3: Basic concepts and definitions; Zeroth Law; properties of pure substances",
            "Week 4-6: State diagrams; the two-property rule; ideal gas and polytropic processes",
            "Week 7-9: First Law of Thermodynamics: heat and work; applications to open and closed systems",
            "Week 10-12: Steady flow energy equation; Bernoulli's equation and applications",
            "Week 13-15: Second Law of Thermodynamics; heat cycles and efficiencies; Carnot cycle"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "ABUADGET208": {
        "code": "ABUAD-GET 208",
        "title": "Strength of Materials",
        "semester": "Second Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Beer, F. P., Johnston, E. R., DeWolf, J. T. & Mazurek, D. F. (2020). Mechanics of Materials, 8th Edition. McGraw-Hill.",
            "Hibbeler, R. C. (2022). Mechanics of Materials, 11th Edition. Pearson."
        ],
        "overview": "This course explores the principles of equilibrium, stress-strain relationships, and the application of Hooke's law to various materials. It covers the effects of loading and temperature changes on stresses and strains, torsion in circular members, and shear forces in beams. The course also examines bending moments, bending stresses in beams with symmetrical and combined loadings, and stress analysis. Topics include consideration of equilibrium, composite members, stress-strain relation, generalized Hooke's law, stresses and strains due to loading and temperature changes, torsion of circular members, shear force, bending moments and bending stresses in beams with symmetrical and combined loadings, and stress analysis using Mohr's circle. Students gain the knowledge necessary to analyze and design structural components under different conditions and determine buckling loads of columns under various fixity conditions at the ends.",
        "prerequisites": "GET 207",
        "clos": [
            {"id": "CLO 1", "desc": "Recognize a structural system that is stable and in equilibrium", "pos": "PO1, PO2"},
            {"id": "CLO 2", "desc": "Determine the stress-strain relation for single and composite members based on Hooke's law", "pos": "PO1, PO2"},
            {"id": "CLO 3", "desc": "Estimate the stresses and strains in single and composite members due to temperature changes", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 4", "desc": "Evaluate the distribution of shear forces and bending moments in beams with distributed and concentrated loads", "pos": "PO1, PO2, PO3"},
            {"id": "CLO 5", "desc": "Determine bending stresses and their use in identifying slopes and deflections in beams", "pos": "PO2, PO3"},
            {"id": "CLO 6", "desc": "Use Mohr's circle to evaluate normal and shear stresses in a multi-dimensional stress system and transformation of these stresses into strains", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 7", "desc": "Evaluate the stresses and strains due to torsion on circular members", "pos": "PO1, PO2"},
            {"id": "CLO 8", "desc": "Determine the buckling loads of columns under various fixity conditions at the ends", "pos": "PO2, PO3, PO4"}
        ],
        "outlines": [
            "Week 1-3: Equilibrium; composite members; stress-strain relation; generalized Hooke's law",
            "Week 4-6: Stresses and strains due to loading and temperature changes",
            "Week 7-9: Torsion of circular members; shear force and bending moments in beams",
            "Week 10-12: Bending stresses in beams with symmetrical and combined loadings",
            "Week 13-15: Mohr's circle stress analysis; buckling of columns; revision"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET210": {
        "code": "GET 210",
        "title": "Engineering Mathematics II",
        "semester": "Second Semester",
        "credits": 3,
        "contactHours": "Lecture - Three hours lectures per week",
        "location": "College of Engineering Lecture Theatre",
        "lecturer": "College of Engineering (Shared Course)",
        "textbooks": [
            "Kreyszig, E. (2020). Advanced Engineering Mathematics, 10th Edition. Wiley.",
            "Stroud, K. A. & Booth, D. J. (2020). Engineering Mathematics, 8th Edition. Red Globe Press."
        ],
        "overview": "This course covers ordinary differential equations (ODEs): theory, applications, and methods of solution including second order differential equations. Topics include advanced calculus (vectors and vector valued functions, line integrals, multiple integrals and their applications) and elementary complex analysis including functions of complex variables, limits and continuity, derivatives, differentiation rules, differentiation of integrals, Cauchy-Riemann equations, harmonic functions, basic theory of conformal mapping, transformation and mapping and its applications to engineering problems, and special functions. Students learn to describe physical systems using ODEs, numerically solve differential equations using MATLAB, perform calculus operations on vector-valued functions, solve problems using fundamental theorems (Green's theorem, divergence theorem, Stokes' theorem), apply complex analysis concepts, and evaluate complex contour integrals.",
        "prerequisites": "GET 209",
        "clos": [
            {"id": "CLO 1", "desc": "Describe physical systems using ordinary differential equations (ODEs)", "pos": "PO1, PO2"},
            {"id": "CLO 2", "desc": "Explain the practical importance of solving ODEs, solution methods, and analytically solve a wide range of ODEs, including linear constant coefficient types", "pos": "PO1, PO2"},
            {"id": "CLO 3", "desc": "Numerically solve differential equations using MATLAB and other emerging applications", "pos": "PO2, PO5"},
            {"id": "CLO 4", "desc": "Perform calculus operations on vector-valued functions, including derivatives, integrals, curvature, displacement, velocity, acceleration, and torsion, as well as on functions of several variables", "pos": "PO1, PO2"},
            {"id": "CLO 5", "desc": "Solve problems using the fundamental theorem of line integrals, Green's theorem, the divergence theorem, and Stokes' theorem", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 6", "desc": "Apply the concept and consequences of analyticity and Cauchy-Riemann equations to solve problems from various fields of engineering", "pos": "PO1, PO2, PO4"},
            {"id": "CLO 7", "desc": "Evaluate complex contour integrals directly and by the fundamental theorem, apply Cauchy integral theorem in its various versions, and the Cauchy integral formula", "pos": "PO1, PO2"}
        ],
        "outlines": [
            "Week 1-3: Introduction to ordinary differential equations (ODEs); theory and methods of solution",
            "Week 4-6: Second order differential equations; numerical solution using MATLAB",
            "Week 7-9: Advanced calculus: vectors and vector valued functions; line integrals",
            "Week 10-12: Multiple integrals; Green's, divergence, and Stokes' theorems",
            "Week 13-15: Complex analysis; Cauchy-Riemann equations; conformal mapping; special functions"
        ],
        "lecturePlans": "Lectures hold on scheduled times per week at the College of Engineering Lecture Theatre. Mandatory tutorial and practical (MATLAB) sessions commence in Week 3. Continuous assessment includes assignments, quizzes, and a mid-semester test in Week 8."
    },
    "GET299": {
        "code": "GET 299",
        "title": "Students Industrial Work Experience I (SIWES I)",
        "semester": "Second Semester",
        "credits": 3,
        "contactHours": "Practical - Nine (9) weeks during long vacation",
        "location": "Approved Industrial Training Placement",
        "lecturer": "College SIWES Coordinator",
        "textbooks": [
            "Industrial Training Fund (ITF) (2020). SIWES Guidelines for Students and Institutions.",
            "ABUAD SIWES Directorate (2024). Students Industrial Work Experience Scheme (SIWES) Handbook."
        ],
        "overview": "SIWES I provides students with practical experience in a workshop or industrial production facility, construction site or special centres in the university environment, considered suitable for relevant practical/industrial working experience. Students are exposed to hands-on activities on workshop safety and ethics, maintenance of tools, equipment and machines, welding, fabrication and foundry equipment, production of simple devices, electrical circuits, wiring and installation, etc. The programme runs for 8 to 10 weeks during the long vacation following the 200 level academic session. Students acquire industrial workplace perceptions, ethics, health and safety consciousness, interpersonal skills and technical capabilities needed to give them a sound engineering foundation.",
        "prerequisites": "Completion of 200 Level",
        "clos": [
            {"id": "CLO 1", "desc": "Acquire industrial workplace perceptions, ethics, health and safety consciousness, interpersonal skills and technical capabilities needed to give them a sound engineering foundation", "pos": "PO6, PO8, PO10"},
            {"id": "CLO 2", "desc": "Learn and practise basic engineering techniques and processes applicable to their specialisations", "pos": "PO1, PO5"},
            {"id": "CLO 3", "desc": "Build machines, devices, structures or facilities relevant to their specific engineering programmes and applications", "pos": "PO3, PO4, PO5"},
            {"id": "CLO 4", "desc": "Acquire competence in technical documentation (log-book) and presentation (report) of their practical experiences", "pos": "PO10, PO9"}
        ],
        "outlines": [
            "Week 1-3: Workplace orientation, safety induction, and familiarisation with industrial environment",
            "Week 4-6: Hands-on training in workshop processes and equipment maintenance",
            "Week 7-9: Practical project work, log-book documentation, and final report preparation"
        ],
        "lecturePlans": "The SIWES programme runs for 9 weeks during the long vacation. Students are placed in approved industrial training locations and supervised by both industrial-based supervisors and institution-based SIWES coordinators. Students maintain daily log-books and submit a comprehensive technical report upon completion."
    }
}


def main():
    # Load existing collegeData.js
    with open('src/collegeData.js', 'r') as f:
        content = f.read()

    json_match = re.search(r'export const collegeData = (\{.*\});', content, re.DOTALL)
    if not json_match:
        print('ERROR: Could not find JSON in collegeData.js')
        return 1

    data = json.loads(json_match.group(1))

    # GET courses are shared across all engineering departments
    # Add them to both Computer and Electrical departments
    added_count = 0
    dept_errors = []

    for dept in ['computer', 'electrical']:
        if dept not in data or 'courses' not in data[dept]:
            dept_errors.append(dept)
            continue

        existing_keys = set(data[dept]['courses'].keys())
        for key, course in GET_COURSES.items():
            if key not in existing_keys:
                data[dept]['courses'][key] = copy.deepcopy(course)
                added_count += 1
                print(f"  Added {course['code']} to {dept}")

    if dept_errors:
        print(f"WARNING: Could not find departments: {dept_errors}")

    # Sort courses by code
    for dept in ['computer', 'electrical']:
        if dept in data and 'courses' in data[dept]:
            courses = data[dept]['courses']
            # Sort by normalized code: strip 'ABUAD-' prefix and sort
            def sort_key(item):
                code = item[1]['code']
                # Normalize for sorting: ABUAD-GET 208 -> GET 208
                normalized = code.replace('ABUAD-', '')
                return normalized.replace(' ', '')

            sorted_courses = dict(sorted(courses.items(), key=sort_key))
            data[dept]['courses'] = sorted_courses

    # Write back
    output = '// Consolidated and parsed college data including engineering course compacts\n'
    output += '// Includes GET (General Engineering Technology) courses shared across all departments\n'
    output += 'export const collegeData = ' + json.dumps(data, indent=2) + ';\n'

    with open('src/collegeData.js', 'w') as f:
        f.write(output)

    print(f"\nDone! Added {added_count} GET course entries across departments.")
    print(f"Each GET course is shared between Computer and Electrical Engineering.")

    # Summary
    total_in_file = sum(len(data[dept].get('courses', {})) for dept in ['computer', 'electrical'])
    print(f"Total courses in collegeData.js: {total_in_file}")

    return 0

if __name__ == '__main__':
    exit(main())
