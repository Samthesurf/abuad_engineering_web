import re

with open("computer_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

blocks = re.split(r'Course\s+Code\s*:', text)

def clean(s):
    return " ".join(s.strip().split())

for idx, block in enumerate(blocks[1:], 1):
    # Find course code
    code_match = re.match(r'^([A-Z]{3}\s*\d{3})', clean(block))
    code = code_match.group(1) if code_match else "UNKNOWN"
    
    # Try to find Overview
    overview = "NOT FOUND"
    overview_match = re.search(r'Course\s+Overview\s+and\s+description\s*(.*?)\s*b\)\s*Pre-requisites', block, re.DOTALL | re.IGNORECASE)
    if overview_match:
        overview = clean(overview_match.group(1))
    else:
        # try without pre-requisites if not found
        overview_match = re.search(r'Course\s+Overview\s+and\s+description\s*(.*?)\s*b\)', block, re.DOTALL | re.IGNORECASE)
        if overview_match:
            overview = clean(overview_match.group(1))
            
    print(f"{idx:02d}: Code={code:<8} | Overview len={len(overview)} | {overview[:80]}...")
