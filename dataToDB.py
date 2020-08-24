import xlrd #needed to mess with excel files
import json

## Take in excel file
#location of file
location = ("jobs.xlsx")

#format of the excel file: major, company, state, opt/cpt


#just to open the file and set the sheet
wb = xlrd.open_workbook(location)
sheet = wb.sheet_by_index(0)

#function to check if something already exists
def alreadyExists(myList, message):
    result = False
    for x in myList:
        if message == x:
            return True
    return False

#function to check if something already exists in list
def alreadyExists2(myList, message):
    result = -1
    check = 0
    for x in myList:
        if message == x.label:
            return check
        else: check = check + 1
    return result

#create data object
class Company:
    def __init__(self, _name):
        self.name = _name
        self.state = []
        self.majors = []
        self.type = []
    def add_major(self, thing):
        self.majors.append(thing)
    def add_state(self, thing):
        self.state.append(thing)
    def add_type(self, thing):
        self.type.append(thing)
    def printme(self):
        print(self.name)
        print(self.majors)
        print(self.state)
        print(self.type)

#class Majors:
class Jobs:
    def __init__(self, name):
        self.label = name
        self.amount = 1
    def plusOne(self):
        self.amount = self.amount + 1

# list of all companies
list = []
majorlist =[]

#Access file (row, col)
row = 1
col = 0 #not really used

#to deal with same company
count = -1
prev_name = ""
prev_type = ""
prev_major = ""
prev_state = ""
listlocation = -1
checker = -1

#loop through all files
for i in range(1, sheet.nrows):
    row = i
    major = sheet.cell_value(row, 0)
    name = sheet.cell_value(row, 1)
    state = sheet.cell_value(row, 2)
    type = sheet.cell_value(row, 3)

    where = alreadyExists2(majorlist, major)
    if where == -1:
        itemp = Jobs(major)
        majorlist.append(itemp)
    else: majorlist[where -1].plusOne




    # if we have another major or city or opt vs cpt
    if name == prev_name:
        #different state?
        if major != prev_major:
            if alreadyExists(list[listlocation].majors, major) == False:
                    list[listlocation].add_major(major)
                    prev_major = major
        if state != prev_state:
            if alreadyExists(list[listlocation].state, state) == False:
                    list[listlocation].add_state(state)
                    prev_state = state
        if type != prev_type:
            if alreadyExists(list[listlocation].type, type) == False:
                    list[listlocation].add_type(type)
                    prev_type = type
    else: # all new stuff, add evreything
        temp = Company(name)
        temp.add_major(major)
        temp.add_type(type)
        temp.add_state(state)
        #temp.printme()
        list.append(temp)
        count = count + 1
        listlocation = listlocation + 1
        prev_name = name
        prev_state = state
        prev_major = major
        prev_type = type

        #last things added for amount of majors


#to send it to file in json format
with open('results.txt', 'w') as json_file:
    for x in range(len(list)):
        x_json = {
            #######################
            "address" : {
                "cityArr" : list[x].state,
                "countryArr": ['USA'],
                "city": '',
                "country":'',
            },
            "hireArr" : list[x].type,
            "jobsArr" : list[x].majors,
            "id"      : x,
            "CompanyName" : list[x].name,
            "abbreviation" : '',
            "logo" : '',
            "educationLevel" : 'TBD',
            "hire" : '',
            "link" : '',
            "jobs" : '',
            "about" : ''
        }
        json.dump(x_json, json_file, indent=4, separators=(',', ':'))

print("File has been converted.")
print("Number of companies: ")
print(count)
##
#print(majorlist)

#def myFunc(e):
 # return e['amount']

#majorlist.sort(key=myFunc)
#function to print all majors
#for m in range(len(majorlist)):
#    print(majorlist[m].label)
#    print(majorlist[m].count)
