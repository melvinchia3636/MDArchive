export default function process(input: string) {
  const menus = ["", ""];
  let isCodeBlock = false;
  let topLevel = NaN;
  let previous = null;

  for (const line of input.split("\n")) {

    const trimmed = line.trim();
    
    if (trimmed.startsWith("```")) {
      isCodeBlock = !isCodeBlock;
    }

    if (isCodeBlock) {
      continue;
    }

    let level = NaN;
    let title = null;

    if (trimmed.startsWith("#")) {
      const match = trimmed.match(/(#+)\s*(.*?)#*\s*$/);
      level = (match || [])[1].length;
      title = (match || [])[2].trim();
    } else if (previous != null && previous.length > 0 && trimmed.length > 0) {
      if (trimmed.match(/[^=]/g) == null) {
        level = 1;
        title = previous;
      } else if (trimmed.match(/[^-]/g) == null && previous.match(/[^-]/g) != null) {
        level = 2;
        title = previous;
      }
    }

    if (level - topLevel >= 10 || level - topLevel < 0) {
      continue;
    }

    if (!isNaN(level) && title != null) {
      if (isNaN(topLevel)) {
        topLevel = level;
      }

      const link = title.toLocaleLowerCase()
        .replace(/\s/g, "-")
        .replace(/[^A-Za-z0-9-_]/g, "");
      const menu = `${"  ".repeat(level - topLevel)}- [${title}](#${link})`;
      menus.push(menu);

      previous = null;
    } else {
      previous = trimmed;
    }
  }

  return menus.join("\n");
}
