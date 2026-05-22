import re

with open("computer_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

blocks = re.split(r'Course\s+Code\s*:', text)

def clean(s):
    return " ".join(s.strip().split())

for idx, block in enumerate(blocks[1:], 1):
    # Find code (first word/letters+numbers in the block)
    lines = [line.strip() for line in block.split("\n") if line.strip()]
    code_match = re.match(r'^([A-Z]{3}\s*\d{3})', clean(block))
    code = code_match.group(1) if code_match else "UNKNOWN"
    
    # Try to find Course Title
    title_match = re.search(r'Course\s+Title\s*:\s*(.*?)\s*(?:Semester|Credit|Hours|Location|Lecturer|Textbooks|a\))', clean(block), re.IGNORECASE)
    title = title_match.group(1) if title_match else "UNKNOWN"
    
    # Try to find Semester
    sem_match = re.search(r'Semester\s*:\s*(.*?)\s*(?:Credit|Hours|Location|Lecturer|Textbooks|a\))', clean(block), re.IGNORECASE)
    sem = sem_match.group(1) if sem_match else "UNKNOWN"
    
    print(f"{idx:02d}: Code={code:<8} | Semester={sem:<8} | Title={title}")
