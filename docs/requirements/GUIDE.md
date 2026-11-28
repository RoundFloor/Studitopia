# Guide: Split Files into 15MB ZIP Parts and Unzip on Linux

This guide explains how to compress files or folders into multiple **15MB** parts and extract them back using only the built-in Linux `zip` and `unzip` utilities.

---

## 1. Install `zip` and `unzip` (If Not Installed)

* **Ubuntu / Debian:**
  ```bash
  sudo apt update && sudo apt install zip unzip -y
  ```
* **Fedora / RHEL / CentOS:**
  ```bash
  sudo dnf install zip unzip -y
  ```
* **Arch Linux:**
  ```bash
  sudo pacman -S zip unzip
  ```

---

## 2. Zip Files into 15MB Parts

Use the `-s 15m` flag to split the output into 15-megabyte chunks.

* **Compress specific files:**
  ```bash
  zip -s 19m PA4-Group05_zip_linux.zip file1.txt file2.pdf video.mp4
  ```

* **Compress an entire folder (including subfolders):**
  ```bash
  zip -r -s 19m PA4-Group05_zip_linux.zip PA4-Group05/
  ```

### Output Files Created
Your directory will contain numbered parts ending with the main `.zip` file:
* `PA4-Group05_zip_linux.z01` (15 MB)
* `PA4-Group05_zip_linux.z02` (15 MB)
* `PA4-Group05_zip_linux.z03` (15 MB)
* `PA4-Group05_zip_linux.zip` (Remaining data, ≤ 15 MB)

*(Keep all `.z01`, `.z02`, and `.zip` files together. Every part is required to extract the PA4-Group05_zip_linux.)*

---

## 3. Unzip the Split Parts Back

Because `unzip` cannot read `.z01` split PA4-Group05_zip_linuxs directly, use `zip -s 0` to merge the parts into a single `.zip` file first.

### Step 1: Merge all parts into one `.zip` file
Make sure all parts (`PA4-Group05_zip_linux.z01`, `PA4-Group05_zip_linux.z02`, ..., `PA4-Group05_zip_linux.zip`) are in the same folder, then run:
```bash
zip -s 0 PA4-Group05_zip_linux.zip --out combined.zip
```

### Step 2: Extract the merged `.zip` file
```bash
unzip combined.zip
```
*(Optional: Use `unzip combined.zip -d output_folder` to extract into a specific directory.)*

### Step 3: Remove the temporary merged file
```bash
rm combined.zip
```
