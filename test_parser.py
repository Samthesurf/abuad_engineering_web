import re
import json

with open("computer_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's split the text by 'Course Code:' to get all course blocks
# We use regex to find 'Course Code:' and split
blocks = re.split(r'Course\s+Code\s*:', text)
print(f"Total blocks split by Course Code: {len(blocks)}")

# Let's inspect block 10 (which is COE 506 or similar)
if len(blocks) > 10:
    print("\n--- SAMPLE BLOCK 10 HEADER ---")
    print(blocks[10][:1000])

