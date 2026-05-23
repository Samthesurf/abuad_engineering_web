import re
import json

with open('parsed_courses.json', 'r') as f:
    parsed_courses = json.load(f)

with open('src/collegeData.js', 'r') as f:
    content = f.read()

json_match = re.search(r'export const collegeData = (\{.*\});', content, re.DOTALL)
if not json_match:
    print('Could not find JSON in collegeData.js')
    exit(1)

json_str = json_match.group(1)
data = json.loads(json_str)

existing_courses = {}
for dept in ['computer', 'electrical']:
    if dept in data and 'courses' in data[dept]:
        existing_courses.update(data[dept]['courses'])

missing = set(parsed_courses.keys()) - set(existing_courses.keys())
print(f'Missing courses from collegeData.js: {missing}')

for m in missing:
    course = parsed_courses[m]
    code = course['code']
    if code.startswith('COE') or code.startswith('CPE'):
        data['computer']['courses'][m] = course
        print(f'Added {code} to Computer Engineering')
    elif code.startswith('EEE'):
        data['electrical']['courses'][m] = course
        print(f'Added {code} to Electrical/Electronics Engineering')

for dept in ['computer', 'electrical']:
    if dept in data and 'courses' in data[dept]:
        courses = data[dept]['courses']
        sorted_courses = {k: v for k, v in sorted(courses.items(), key=lambda item: item[1]['code'].replace(' ', ''))}
        data[dept]['courses'] = sorted_courses

with open('src/collegeData.js', 'w') as f:
    f.write('// Consolidated and parsed college data including engineering course compacts\nexport const collegeData = ' + json.dumps(data, indent=2) + ';\n')
print('Successfully verified and sorted courses in src/collegeData.js')
