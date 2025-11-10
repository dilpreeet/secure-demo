import sys
import pandas as pd
from pathlib import Path

EXPECTED_ROWS = 10000
CSV_PATH = Path("data/orders.csv")

print("Running validation checks...")
if not CSV_PATH.exists():
    print(f"❌ ERROR: data file not found at {CSV_PATH}")
    sys.exit(2)

df = pd.read_csv(CSV_PATH)
actual = len(df)
print(f"Checking row count: expected {EXPECTED_ROWS}, got {actual}")

if actual < EXPECTED_ROWS:
    print("❌ Validation FAILED: row count below threshold")
    sys.exit(1)

print("✅ Validation PASSED")
