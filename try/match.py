# from fastapi import FastAPI
# import mysql.connector

# host = 'localhost'
# user = 'root'
# password = ''
# database = 'thuctap'

# conn = mysql.connector.connect(host=host,
#                                user=user,
#                                password = password,
#                                database= database)
# list1 = []
# list2 = []
# positions = []
# cursor = conn.cursor()
# cursor.execute("SELECT masv,gpa from sinhvien")
# result = cursor.fetchall()
# for row in result:
#     list1.append((row[0], row[1]))

# cursor.execute("SELECT * from nguyenvong")
# result = cursor.fetchall()
# for row in result:
#     list2.append((row[0], row[1],row[2],row[3]))

# cursor.execute("SELECT mavt,diemsan, soluongtuyen from vitri")
# result = cursor.fetchall()
# for row in result:
#     positions.append((row[0], row[1],row[2]))
# # list1 = [(100, 3.0), (101, 3.2), (102, 3.3), (104, 2.8), (105, 2.9)]
# # list2 = [(100, 1, 2, 3), (101, 3, 2, 1), (102, 2, 1, 3), (103, 1, 3, 2), (104, 1, 2, 3), (105, 3, 2, 1)]
# # positions = [(1, 3.0, 1), (2, 3.0, 2), (3, 2.8, 2)]
# # print(f"Sinh viên : {list1}")
# # print()
# # print(f"Nguyện vọng: {list2}")
# # print()
# # print(f"Vị trí: {positions}")
# # print()
# students = [(item1[0], item1[1], *item2[1:]) for item1 in list1 for item2 in list2 if item1[0] == item2[0]]
# id = [x[0] for x in students]


id_gpa = []
with open("idAndGpa.txt") as f:
    for line in f:
        tokens = line.strip().split(", ")
        id_gpa.append((tokens[0],float(tokens[1])))

positions = []
with open("positions.txt") as f:
    for line in f:
        tokens = line.strip().split(", ")
        positions.append((tokens[0], float(tokens[1]), int(tokens[2])))

promises = []
with open("promises.txt") as f:
    for line in f:
        tokens = line.strip().split(", ")
        promises.append((tokens[0], tokens[1], tokens[2], tokens[3]))

students = [(item1[0], item1[1], *item2[1:]) for item1 in id_gpa for item2 in promises if item1[0] == item2[0]]
id = [x[0] for x in students]

promision = {}
for i in range(3):
    pm = {position[0] : [] for position in positions}
    for position in positions:
        for student in students:
            if(student[2+i] == position[0]):
                pm[position[0]].append((student[0],student[1]))
    lst_pm = [[k,v, *position[1:]] for k,v in pm.items() for position in positions if position[0] == k]
    dct_pm = {x[0] : x[1:] for x in lst_pm}
    promision[f'NV{i+1}'] = dct_pm
print(f"Vị trí theo nguyện vọng: {promision}")

#loại bỏ đi các sinh viên có điểm thấp hơn điểm sàn
def cut(lst, k):
    cut_list = []
    for x in lst:
        if(x[1] >= k):
            cut_list.append((x[0],x[1]))
    return cut_list
#sau khi match được sinh viên thì xóa sinh viên đó khỏi list id
def delete(id,lst):
    new_id = []
    for i in range(len(id)):
        if lst is not None and id[i] not in lst:
            new_id.append(id[i])
    return new_id
def matching(dct,id):
    result = {mvt : [] for mvt in dct.keys()}
    for mvt in dct.keys():
        p = dct[mvt]
        p[0].sort(key= lambda x: x[1], reverse = True)
        p[0] = cut(p[0],p[1])
        if(len(p[0]) > p[2]):
            p[0] = (p[0])[:(p[2])]
        msvs = [x[0] for x in p[0]]
        for msv in msvs:
            if msv in id:
                result[mvt].append(msv)
                id = delete(id,result[mvt])
    return result
dct = promision['NV1']
match_std = matching(dct,id)
with open("output_match.txt", "w", encoding="utf-8") as output_file:
    output_file.write("Kết quả matching:\n")
    for key, value in match_std.items():
        output_file.write(f"{key}: {value}\n")
print("Kết quả matching:")
print(match_std)

    

