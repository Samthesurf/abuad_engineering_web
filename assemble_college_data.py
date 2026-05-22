import json

# Load parsed courses
with open("parsed_courses.json", "r", encoding="utf-8") as f:
    courses = json.load(f)

computer_courses = {}
electrical_courses = {}

for key, c in courses.items():
    if key.startswith("COE"):
        computer_courses[key] = c
    elif key.startswith("EEE"):
        electrical_courses[key] = c

# Calculate PO mapping matrix
def get_po_matrix(dept_courses):
    import re
    mappings = []
    for key, c in dept_courses.items():
        po_counts = {i: 0 for i in range(1, 13)}
        for clo in c.get("clos", []):
            pos_in_clo = re.findall(r'PO\s*(\d+)', clo.get("pos", ""), re.IGNORECASE)
            for p in pos_in_clo:
                p_num = int(p)
                if 1 <= p_num <= 12:
                    po_counts[p_num] += 1
        
        course_map = {"course": c["code"]}
        for i in range(1, 13):
            count = po_counts[i]
            # Heuristic mapping: >=2 CLOs = 3 (High), 1 CLO = 2 (Medium), 0 = 1 (Low)
            course_map[f"po{i}"] = 3 if count >= 2 else (2 if count == 1 else 1)
        mappings.append(course_map)
    mappings.sort(key=lambda x: x["course"])
    return mappings

computer_mappings = get_po_matrix(computer_courses)
electrical_mappings = get_po_matrix(electrical_courses)

# Define static objects
general_info = {
    "title": "General College Information",
    "subtitle": "College of Engineering, Afe Babalola University",
    "establishment": {
        "university": "Established in 2009",
        "college": "Established in September 2010",
        "founder": "Aare Afe Babalola, OFR, CON, SAN, LL.D, D.Litt",
        "vc": "Prof. Elisabeta S. OLARINDE (FCArb, FCN)"
    },
    "vision": "To be a world-class educational centre of excellence in academics, character, sports, and vocational development.",
    "mission": "Afe Babalola University is a result-oriented institution for producing highly skilled and socially relevant graduates capable of applying scientific knowledge for the resolution of social problems.",
    "coreGoals": [
        "Encourage a balance between academic excellence, professional ethics, and practical competence.",
        "Encourage daily consistency and personal integrity among the students.",
        "Define and lead emerging disciplines and intellectual paradigms that create knowledge for the benefit of society.",
        "Foster effective concern for environmental well-being, justice, peace, and sustainable development."
    ],
    "qaPrinciples": [
        { "title": "Criterion 1: Programme Educational Objectives (PEOs)", "desc": "PEOs represent broad career goals reviewed every 5 years with input from alumni and employers, ensuring alignment with ABUAD's mission." },
        { "title": "Criterion 2: Programme Outcomes (POs)", "desc": "12 COREN-aligned engineering proficiencies measured rigorously via direct course assessments and final year capstone projects." },
        { "title": "Criterion 3: Course Learning Outcomes (CLOs)", "desc": "Every course has clear, measurable CLOs mapped back to POs and outlined in details within the Course Compact." },
        { "title": "Criterion 4: Curriculum & Learning Process", "desc": "Outcomes-Based Education (OBE) curriculum with 30% local content, plus structured Student Work Experience Program (SWEP) and SIWES industrial placements." },
        { "title": "Criterion 5: Student Advising & Attendance", "desc": "Mandatory level advisers guide students, and a minimum of 75% to 80% attendance is strictly enforced to qualify for exams." },
        { "title": "Criterion 6: Continuous Quality Improvement (CQI)", "desc": "Systematic feedback loops including external examiner moderation, annual employer surveys, and laboratory equipment updates." },
        { "title": "Criterion 7: Staffing & Research", "desc": "Healthy student-to-staff ratios with faculty active in professional societies (COREN, NSE, IEEE, IET) and global engineering research." }
    ]
}

computer_peos = [
    { "id": "PEO 1", "desc": "To produce highly skilled and competent Computer engineers that will contribute to academia, industrial and professional Engineering practice." },
    { "id": "PEO 2", "desc": "To produce proficient, self-reliant, and excellent Computer Engineers equipped with strong technical skills, a solid understanding of fundamental concepts, and the ability to address contemporary challenges." },
    { "id": "PEO 3", "desc": "To produce graduates who will actively engage in continuous professional development and lifelong learning, pursue advanced studies, and obtain relevant certifications, remaining relevant in a rapid industry." },
    { "id": "PEO 4", "desc": "To produce graduates who can provide practical and cost-effective solutions to real-world problems by applying modeling knowledge, innovative thinking, and entrepreneurial skills." },
    { "id": "PEO 5", "desc": "To produce graduates that will uphold ethical standards, demonstrate integrity, leadership, and practice Computer engineering responsibly in compliance with national and international professional codes." }
]

computer_pos = [
    { "id": "PO 1", "name": "Engineering Knowledge", "desc": "Apply knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of developmental and complex engineering problems." },
    { "id": "PO 2", "name": "Problem Analysis", "desc": "Identify, formulate, research literature, and analyze developmental and complex engineering problems reaching substantiated conclusions using first principles." },
    { "id": "PO 3", "name": "Design/Development", "desc": "Proffer solutions for developmental or complex engineering problems and design systems, components or processes that meet specified needs with appropriate safety and environmental considerations." },
    { "id": "PO 4", "name": "Investigation", "desc": "Conduct investigation into complex problems using research-based knowledge and research methods including experiments, analysis, and data synthesis." },
    { "id": "PO 5", "name": "Modern Tool Usage", "desc": "Create, select, and apply appropriate techniques, resources, and modern engineering and ICT tools, including prediction, modeling, and optimization with an understanding of the limitations." },
    { "id": "PO 6", "name": "Engineer & Society", "desc": "Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues relevant to professional engineering practice." },
    { "id": "PO 7", "name": "Environment & Sustainability", "desc": "Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate knowledge of and need for sustainable development." },
    { "id": "PO 8", "name": "Ethics", "desc": "Apply ethical principles and commit to professional ethics and responsibilities and norms of engineering practice, including adherence to the COREN Engineers Code of Conducts." },
    { "id": "PO 9", "name": "Individual & Teamwork", "desc": "Function effectively as an individual, and as a member or leader in diverse teams and in multi-disciplinary settings." },
    { "id": "PO 10", "name": "Communication", "desc": "Communicate effectively on complex engineering activities with the engineering community and with society at large, write effective reports, and make presentations." },
    { "id": "PO 11", "name": "Project Management", "desc": "Demonstrate knowledge and understanding of engineering, management, and financial principles to manage projects as a member or leader." },
    { "id": "PO 12", "name": "Lifelong Learning", "desc": "Recognize the need for and have the preparations and ability to engage in independent and lifelong learning in the broadest context of technological and social changes." }
]

computer_handbooks = {
    "student": {
        "title": "Computer Engineering Student Handbook",
        "desc": "This handbook serves as the academic guide for B.Eng. Computer Engineering students. It includes details on the modularized course unit system, graduation requirements (minimum 180 units), class of degree thresholds, CGPA calculations, and standard academic policies."
    },
    "departmental": {
        "title": "Departmental Laboratories & Code of Conduct",
        "desc": "Our hardware and networking laboratories are structured for practical hands-on experience in computer engineering. Students are expected to adhere to guidelines concerning laboratory safety, anti-static protocols, equipment care, and project scheduling."
    }
}

electrical_peos = [
    { "id": "PEO 1", "desc": "To produce highly skilled and competent Electrical/Electronics engineers that will contribute to academia, industrial and professional Engineering practice." },
    { "id": "PEO 2", "desc": "To produce proficient, self-reliant, and excellent Electrical/Electronics Engineers equipped with strong technical skills, a solid understanding of fundamental concepts, and the ability to address contemporary challenges." },
    { "id": "PEO 3", "desc": "To produce graduates who will actively engage in continuous professional development and lifelong learning, pursue advanced studies, and obtain relevant certifications, remaining relevant in a rapid industry." },
    { "id": "PEO 4", "desc": "To produce graduates who can provide practical and cost-effective solutions to real-world problems by applying modeling knowledge, innovative thinking, and entrepreneurial skills." },
    { "id": "PEO 5", "desc": "To produce graduates that will uphold ethical standards, demonstrate integrity, leadership, and practice Electrical/Electronics engineering responsibly in compliance with national and international professional codes." }
]

electrical_pos = computer_pos # identical definition

electrical_handbooks = {
    "student": {
        "title": "Electrical/Electronics Engineering Student Handbook",
        "desc": "This handbook serves as the primary academic manual for Electrical/Electronics Engineering undergraduates. It contains information on laboratory sessions, mandatory industrial attachment (SWEP/SIWES), credit loading, course structures, and graduation benchmarks."
    },
    "departmental": {
        "title": "Power and Electronics Lab Security & Guidelines",
        "desc": "Our power networks, solar, and electronics laboratories house expensive testing instruments. This departmental guide outlines protocols for operating single/three-phase motors, grounding standards, safety breakers, and lab dress code guidelines."
    }
}

college_data = {
    "general": general_info,
    "computer": {
        "name": "Computer Engineering",
        "abbreviation": "B.Eng. Computer Engineering",
        "duration": "Five (5) Years",
        "hod": "Engr. Dr. Adedayo Olukayode OJO MNSE, R.Eng., MIAENG (COREN: R33,712)",
        "history": "Established in September 2010 alongside three other departments within the College of Engineering, ABUAD. The B.Eng. in Computer Engineering programme was pioneered by esteemed professors including Professor I. E. OWOLABI and Professor OLOWOLAFE. They successfully led the programme to outstanding heights, notably winning prestigious medals at the Microsoft Imagine Cup global student competition event held in the United States. Grounded in basic sciences, mathematics, and advanced computing principles, the program balances engineering aesthetics, professional ethics, and hands-on lab experimentation.",
        "philosophy": "The programme strongly believes in the production of graduates who appreciate the value of the dignity of labor and who are problem solvers, self-reliant, employers of labor, highly productive, and globally relevant in every sphere of human endeavor.",
        "vision": "To be a world-class center of excellence in Computer Engineering education, fostering academic innovation, ethical leadership, and holistic development in character, research, and vocational competence.",
        "mission": "To produce highly competent Computer Engineers equipped with strong technical expertise, practical skills, and professional ethics through rigorous academic training, hands-on experience, and the development of innovative solutions to global challenges.",
        "peos": computer_peos,
        "pos": computer_pos,
        "handbooks": computer_handbooks,
        "courses": computer_courses,
        "mappings": computer_mappings
    },
    "electrical": {
        "name": "Electrical/Electronics Engineering",
        "abbreviation": "B.Eng. Electrical and Electronics Engineering",
        "duration": "Five (5) Years",
        "hod": "Engr. Dr. Adedayo Olukayode OJO MNSE, R.Eng., MIAENG (COREN: R33,712)",
        "history": "Established in September 2010 alongside three other departments within the College of Engineering, ABUAD. The B.Eng. in Electrical and Electronics Engineering programme was pioneered by esteemed professors including Professor I. E. OWOLABI and Professor OLOWOLAFE. They successfully led the programme to outstanding heights, notably winning prestigious medals at the Microsoft Imagine Cup global student competition event held in the United States. The curriculum provides solid training in electromagnetic waves, energy conversion, electric machines, analogue electronics, power grids, and sustainable energy.",
        "philosophy": "The programme strongly believes in the production of graduates who appreciate the value of the dignity of labor and who are problem solvers, self-reliant, employers of labor, highly productive, and globally relevant in every sphere of human endeavor.",
        "vision": "To be a world-class center of excellence in Electrical and Electronic Engineering education, fostering academic innovation, ethical leadership, and holistic development in character, research, and vocational competence.",
        "mission": "To produce highly competent Electrical and Electronic Engineers equipped with strong technical expertise, practical skills, and professional ethics through rigorous academic training, hands-on experience, and the development of innovative solutions to global challenges.",
        "peos": electrical_peos,
        "pos": electrical_pos,
        "handbooks": electrical_handbooks,
        "courses": electrical_courses,
        "mappings": electrical_mappings
    }
}

# Write out src/collegeData.js
js_content = f"// Consolidated and parsed college data including {len(courses)} engineering course compacts\n"
js_content += f"export const collegeData = {json.dumps(college_data, indent=2, ensure_ascii=False)};\n"

with open("src/collegeData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully created src/collegeData.js with {len(courses)} courses!")

