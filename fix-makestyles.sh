#!/bin/bash

# Fix makeStyles theme access by adding useTheme hook

files=(
  "src/components/pages/PageNotFound.js"
  "src/components/pages/AboutPage.js"
  "src/components/SiteFooter.js"
  "src/components/EventModificationPanel.js"
  "src/components/EventSortFilterPanel.js"
  "src/components/EventTagList.js"
  "src/components/common/NoEventsPanel.js"
  "src/components/common/NotificationEventItemLoader.js"
  "src/components/common/QuickActions.js"
  "src/components/EventItemCard.js"
  "src/components/common/appThemeToggler.js"
  "src/components/NotificationEventItem.js"
  "src/components/common/EventItemLoader.js"
  "src/components/Navbar.js"
  "src/components/common/AddTagForm.js"
)

for file in "${files[@]}"; do
  echo "Fixing $file..."
  
  # Add useTheme import if makeStyles is imported
  if grep -q "import { makeStyles } from \"@mui/styles\"" "$file"; then
    # Check if useTheme is already imported
    if ! grep -q "useTheme" "$file"; then
      # Add useTheme import after makeStyles import
      sed -i '' '/import { makeStyles } from "@mui\/styles";/a\
import { useTheme } from "@mui/material/styles";
' "$file"
    fi
  fi
  
  # Replace const classes = useStyles(); with theme version
  sed -i '' 's/const classes = useStyles();/const theme = useTheme();\
  const classes = useStyles(theme);/g' "$file"
  
done

echo "Done!"
