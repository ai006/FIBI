
# Reading an excel file using Python 
import xlrd 
  
# Give the location of the file 
loc = ("jobs.xlsx") 
  
# To open Workbook 
wb = xlrd.open_workbook(loc) 
sheet = wb.sheet_by_index(0) 
  
arrayJobs = []
specificJob = []

#begin  4
#end 42
 
size =   sheet.nrows

for x in range(4,size):
    arrayJobs.append(sheet.row_values(x))
for x in range(4,42):
    specificJob.append(sheet.row_values(x))

print(arrayJobs[2][1])


for temp in specificJob:
    for j in range(0,size - 4):
        print(arrayJobs[j][1])
        #if(temp[1] == arrayJobs[j][1]):
        #    print(temp[1])
        pass

print("\n")
print("Program done")

