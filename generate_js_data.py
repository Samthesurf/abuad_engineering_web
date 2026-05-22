import json
import re

with open("parsed_courses.json", "r", encoding="utf-8") as f:
    courses = json.load(f)

computer_courses = {}
electrical_courses = {}

# Separate into computer and electrical
for key, course in courses.items():
    if key.startswith("COE"):
        computer_courses[key] = course
    elif key.startswith("EEE"):
        electrical_courses[key] = course

# Compute mapping for a department's courses
def compute_mappings(dept_courses):
    mappings = []
    for key, c in dept_courses.items():
        po_counts = {i: 0 for i in range(1, 13)}
        for clo in c.get("clos", []):
            pos_in_clo = re.findall(r'PO\s*(\d+)', clo.get("pos", ""), re.IGNORECASE)
            for p in pos_in_clo:
                p_num = int(p)
                if 1 <= p_num <= 12:
                    po_counts[p_num] += 1
        
        # Calculate mapping values:
        # If PO referenced in >= 2 CLOs -> 3 (High)
        # If PO referenced in 1 CLO -> 2 (Medium)
        # Else -> 1 (Low)
        course_map = {"course": c["code"]}
        for i in range(1, 13):
            count = po_counts[i]
            if count >= 2:
                val = 3
            elif count == 1:
                val = 2
            else:
                val = 1
            course_map[f"po{i}"] = val
        mappings.append(course_map)
    
    # Sort mappings alphabetically by course code
    mappings.sort(key=lambda x: x["course"])
    return mappings

computer_mappings = compute_mappings(computer_courses)
electrical_mappings = compute_mappings(electrical_courses)

# Format as JavaScript objects
def format_js_object(obj):
    return json.dumps(obj, indent=8, ensure_ascii=False)

# Write JS code to txt files
with open("computer_courses_js.txt", "w", encoding="utf-8") as f:
    f.write("courses: " + json.dumps(computer_courses, indent=8, ensure_ascii=False) + ",\n")
    f.write("mappings: " + json.dumps(computer_mappings, indent=8, ensure_ascii=False))

with open("electrical_courses_js.txt", "w", encoding="utf-8") as f:
    f.write("courses: " + json.dumps(electrical_courses, indent=8, ensure_ascii=False) + ",\n")
    f.write("mappings: " + json.dumps(electrical_mappings, indent=8, ensure_ascii=False))

print("Successfully generated JS data files!")
print(f"Computer courses: {len(computer_courses)}, mappings: {len(computer_mappings)}")
print(f"Electrical courses: {len(electrical_courses)}, mappings: {len(electrical_mappings)}")

